package com.ddbb.dingdong.domain.reservation.service;

import com.ddbb.dingdong.domain.reservation.entity.Reservation;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationType;
import com.ddbb.dingdong.domain.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class ReservationManagement {
    private final ReservationRepository reservationRepository;

    public void reserveGeneral(Reservation reservation) {
        validateDateOfGeneralReservation(reservation);
        reservationRepository.save(reservation);
    }

    public void cancel(Long userId, Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(ReservationErrors.NOT_FOUND::toException);

        if(!reservation.getUserId().equals(userId)) {
            throw ReservationErrors.INVALID_ACCESS.toException();
        }

        reservation.cancel();
    }

    private void validateDateOfGeneralReservation(Reservation reservation) {
        if(!ReservationType.GENERAL.equals(reservation.getType())){
            throw ReservationErrors.INVALID_RESERVATION_TYPE.toException();
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reservationDate = reservation.getDirection().equals(Direction.TO_SCHOOL) ? reservation.getArrivalTime() : reservation.getDepartureTime();
        LocalDateTime deadLine = reservationDate.minusHours(48).minusMinutes(5);
        LocalDateTime maxDate = reservationDate.plusMonths(2);

        if(now.isAfter(deadLine)){
            throw ReservationErrors.EXPIRED_RESERVATION_DATE.toException();
        }
        if(now.isAfter(maxDate)){
            throw ReservationErrors.EXCEEDED_RESERVATION_DATE.toException();
        }
        if(reservationDate.getMinute() != 0 && reservationDate.getMinute() != 30) {
            throw ReservationErrors.NOT_SUPPORTED_RESERVATION_TIME.toException();
        }
        if(reservation.getDirection().equals(Direction.TO_SCHOOL)) {
            if (reservationDate.toLocalTime().isBefore(LocalTime.of(8,0)) || reservationDate.toLocalTime().isAfter(LocalTime.of(18,0))) {
                throw ReservationErrors.NOT_SUPPORTED_RESERVATION_TIME.toException();
            }
        } else {
            if (reservationDate.toLocalTime().isBefore(LocalTime.of(11,0)) || reservationDate.toLocalTime().isAfter(LocalTime.of(21,0))) {
                throw ReservationErrors.NOT_SUPPORTED_RESERVATION_TIME.toException();
            }
        }
    }

}