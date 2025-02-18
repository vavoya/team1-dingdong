package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.transportation.entity.vo.OperationStatus;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.projection.UserBusStopProjection;
import com.ddbb.dingdong.domain.transportation.service.BusErrors;
import com.ddbb.dingdong.domain.transportation.service.BusPublishService;
import com.ddbb.dingdong.domain.transportation.service.BusScheduleManagement;
import com.ddbb.dingdong.domain.transportation.service.dto.UserBusStopTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class StartBusUseCase implements UseCase<StartBusUseCase.Param, Void> {
    private final BusPublishService busPublishService;
    private final BusScheduleQueryRepository busScheduleQueryRepository;
    private final BusScheduleManagement busScheduleManagement;

    @Override
    @Transactional
    public Void execute(StartBusUseCase.Param param) {
        List<UserBusStopProjection> projections = busScheduleQueryRepository.findUserBusStops(param.getBusScheduleId());
        if (projections.isEmpty()) {
            throw BusErrors.NO_BUS_FOUND.toException();
        }
        busScheduleManagement.updateBusSchedule(param.busScheduleId, OperationStatus.RUNNING);
        Map<Long, UserBusStopTime> busStopTimeMap = new LinkedHashMap<>();
        for (UserBusStopProjection proj : projections) {
            if (!busStopTimeMap.containsKey(proj.getBusStopId())) {
                busStopTimeMap.put(proj.getBusStopId(), new UserBusStopTime(proj.getBusStopId(), proj.getBusStopArrivalTime()));
            }
        }
        List<UserBusStopTime> userBusStopTimes = busStopTimeMap.values().stream().toList();

        LocalDateTime now = LocalDateTime.now();
        List<UserBusStopTime> newUserBusStopTimes = busScheduleManagement.adjustBusStopTimes(now, userBusStopTimes);

        busScheduleManagement.updateBusStopTimes(newUserBusStopTimes, userBusStopTimes);
        busPublishService.publishSimulator(
                param.busScheduleId,
                param.interval,
                param.delay,
                param.timeUnit
        );
        busScheduleManagement.updateBusScheduleExpectedArrivalTime(param.getBusScheduleId(), newUserBusStopTimes.get(newUserBusStopTimes.size() - 1).getTime());
        busScheduleManagement.publishDepartureEvent(newUserBusStopTimes);
        return null;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long busScheduleId;
        private Long interval;
        private Long delay;
        private TimeUnit timeUnit;
    }
}
