package com.ddbb.dingdong.application.usecase.reservation;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.reservation.repository.BusStopRepository;
import com.ddbb.dingdong.domain.reservation.service.ReservationErrors;
import com.ddbb.dingdong.domain.reservation.service.ReservationManagement;
import com.ddbb.dingdong.domain.transportation.entity.BusSchedule;
import com.ddbb.dingdong.domain.transportation.entity.BusStop;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleRepository;
import com.ddbb.dingdong.infrastructure.auth.encrypt.TokenManager;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RequestTogetherReservationUseCase implements UseCase<RequestTogetherReservationUseCase.Param, RequestTogetherReservationUseCase.Result> {
    private final TokenManager tokenManager;
    private final BusScheduleRepository busScheduleRepository;
    private final ReservationManagement reservationManagement;
    private final BusStopRepository busStopRepository;

    @Override
    public Result execute(Param param) {
        LocalDateTime hopeTime = extractTimeFromBusSchedule(param);
        checkHasDuplicatedReservation(param.userId, hopeTime);
        String token = generateToken(param);
        return new Result(token);
    }

    private String generateToken(Param param) {
        return tokenManager.generateToken(param);
    }

    private void checkHasDuplicatedReservation(Long userId, LocalDateTime hopeTime) {
        reservationManagement.checkHasDuplicatedReservation(userId, hopeTime);
    }

    private LocalDateTime extractTimeFromBusSchedule(Param param) {
        Long busScheduleId = param.busScheduleId;
        Long busStopId = param.getBusStopId();
        BusSchedule schedule = busScheduleRepository.findById(busScheduleId).orElseThrow(ReservationErrors.BUS_SCHEDULE_NOT_FOUND::toException);
        BusStop busStop = busStopRepository.findById(busStopId).orElseThrow(ReservationErrors.BUS_STOP_NOT_FOUND::toException);
        if(busStop.getLocationId() == null) {
            throw ReservationErrors.INVALID_BUS_STOP.toException();
        }
        LocalDateTime hopeTime = schedule.getDirection().equals(Direction.TO_SCHOOL)
                ? schedule.getArrivalTime()
                : schedule.getDepartureTime();
        return hopeTime;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Long busStopId;
        private Long busScheduleId;
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        private String token;
    }
}
