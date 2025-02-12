package com.ddbb.dingdong.domain.reservation.repository.projection;

import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationStatus;
import com.ddbb.dingdong.domain.transportation.entity.vo.OperationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserReservationProjection {
    Long getReservationId();
    LocalDate getStartDate();
    String getBusStopRoadNameAddress();
    String getUserHomeStationName();
    Direction getDirection();
    LocalDateTime getExpectedArrivalTime();
    ReservationStatus getReservationStatus();
    Long getBusScheduleId();
    OperationStatus getBusStatus();
    String getBusName();
    LocalDateTime getBusStopArrivalTime();
    Integer getTotalMinutes();
}
