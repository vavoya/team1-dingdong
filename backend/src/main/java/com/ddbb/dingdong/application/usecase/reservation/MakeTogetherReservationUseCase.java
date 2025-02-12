package com.ddbb.dingdong.application.usecase.reservation;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.payment.service.PaymentManagement;
import com.ddbb.dingdong.domain.reservation.entity.Reservation;
import com.ddbb.dingdong.domain.reservation.entity.Ticket;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationStatus;
import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationType;
import com.ddbb.dingdong.domain.reservation.repository.BusStopRepository;
import com.ddbb.dingdong.domain.reservation.service.ReservationErrors;
import com.ddbb.dingdong.domain.reservation.service.ReservationManagement;
import com.ddbb.dingdong.domain.transportation.entity.BusSchedule;
import com.ddbb.dingdong.domain.transportation.entity.BusStop;
import com.ddbb.dingdong.domain.transportation.entity.vo.OperationStatus;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleRepository;
import com.ddbb.dingdong.infrastructure.auth.encrypt.TokenManager;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MakeTogetherReservationUseCase implements UseCase<MakeTogetherReservationUseCase.Param, Void> {
    private final ReservationManagement reservationManagement;
    private final PaymentManagement paymentManagement;
    private final BusScheduleQueryRepository busScheduleQueryRepository;
    private final BusStopRepository busStopRepository;
    private final TokenManager tokenManager;
    private final BusScheduleRepository busScheduleRepository;
    private BusStop busStop;
    private BusSchedule busSchedule;

    @Transactional
    @Override
    public Void execute(Param param) {
        param.validate();
        isValidReservationInfo(param.reservationInfo);
        validateToken(param.token, param.reservationInfo);
        pay(param.getReservationInfo().userId);
        Reservation reservation = makeTogetherReservations(param.reservationInfo);
        issueTicket(reservation);
        log.info("ID {}, Together reservation completed. Reservation ID: {}", param.getReservationInfo().userId, reservation.getId());
        return null;
    }

    private boolean isValidReservationInfo(Param.ReservationInfo reservationInfo) {
        Long busStopId = reservationInfo.getBusStopId();
        Long busScheduleId = reservationInfo.getBusScheduleId();
        busSchedule = busScheduleQueryRepository.findById(busScheduleId).orElseThrow(ReservationErrors.BUS_SCHEDULE_NOT_FOUND::toException);
        if (!busSchedule.getStatus().equals(OperationStatus.READY)) throw ReservationErrors.EXCEEDED_RESERVATION_DATE.toException();

        busStop = busStopRepository.findById(busStopId).orElseThrow(ReservationErrors.BUS_STOP_NOT_FOUND::toException);
        Long queryBusScheduleId = busStop.getPath().getBusSchedule().getId();
        if (busScheduleId != queryBusScheduleId) throw ReservationErrors.INVALID_BUS_STOP.toException();

        return true;
    }

    private void validateToken(String token, MakeTogetherReservationUseCase.Param.ReservationInfo reservation) {
        String data;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            data = objectMapper.writeValueAsString(reservation);
            tokenManager.validateToken(token, data);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.FORBIDDEN);
        }
    }

    private Reservation makeTogetherReservations(MakeTogetherReservationUseCase.Param.ReservationInfo reservationInfo) {
        Reservation.ReservationBuilder reservationBuilder = Reservation.builder()
                .userId(reservationInfo.getUserId())
                .type(ReservationType.TOGETHER)
                .direction(busSchedule.getDirection())
                .status(ReservationStatus.ALLOCATED)
                .startDate(reservationInfo.date.toLocalDate());
        if(busSchedule.getDirection().equals(Direction.TO_SCHOOL)) {
            reservationBuilder.arrivalTime(reservationInfo.date);
        } else {
            reservationBuilder.departureTime(reservationInfo.date);
        }
        return reservationManagement.reserveTogether(reservationBuilder.build());
    }

    private void pay(Long userId){
        paymentManagement.pay(userId, 1);
    }

    private void issueTicket(Reservation reservation) {
        busSchedule = busScheduleQueryRepository.findByIdForUpdate(busSchedule.getId()).orElseThrow(ReservationErrors.BUS_SCHEDULE_NOT_FOUND::toException);
        try {
            busSchedule.issue();
        } catch (DomainException e) {
            throw ReservationErrors.TICKET_SOLD_OUT.toException();
        }
        Ticket ticket = new Ticket(null, busSchedule.getId(), busStop.getId(), reservation);
        reservationManagement.issueTicket(reservation, ticket);
        busScheduleRepository.save(busSchedule);
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private String token;
        private MakeTogetherReservationUseCase.Param.ReservationInfo reservationInfo;

        @Getter
        @AllArgsConstructor
        public static class ReservationInfo {
            private Long userId;
            private Long busStopId;
            private Long busScheduleId;

            @JsonSerialize(using = LocalDateTimeSerializer.class)
            @JsonDeserialize(using = LocalDateTimeDeserializer.class)
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
            private LocalDateTime date;
        }

        @Override
        public boolean validate() {
            if (token == null
                    || reservationInfo == null
                    || reservationInfo.userId == null
                    || reservationInfo.busStopId == null
                    || reservationInfo.busScheduleId == null
                    || reservationInfo.date == null) {
                throw ReservationErrors.NOT_FOUND.toException();
            }
            return true;
        }
    }
}
