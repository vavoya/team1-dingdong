package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.projection.ScheduleTimeProjection;
import com.ddbb.dingdong.domain.transportation.service.BusStopQueryService;
import com.ddbb.dingdong.domain.user.repository.UserQueryRepository;
import com.ddbb.dingdong.domain.user.repository.projection.HomeStationProjection;
import com.ddbb.dingdong.domain.user.service.error.UserErrors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetBusSchedulesUseCase implements UseCase<GetBusSchedulesUseCase.Param, GetBusSchedulesUseCase.Response> {
    private final UserQueryRepository userRepository;
    private final BusStopQueryService busStopQueryService;

    @Override
    @Transactional(readOnly = true)
    public Response execute(Param param) {
        HomeStationProjection proj = userRepository.findHomeStationLocationWithSchoolId(param.getUserId())
                .orElseThrow(UserErrors.NOT_FOUND::toException);
        List<LocalDateTime> times = busStopQueryService.findAllAvailableBusStopTimes(
                param.direction,
                proj.getSchoolId(),
                proj.getStationLongitude(),
                proj.getStationLatitude()
        );
        return new Response(times);
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Direction direction;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private List<LocalDateTime> schedules;
    }
}
