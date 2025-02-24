package com.ddbb.dingdong.application.usecase.reservation;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.application.usecase.reservation.error.ReservationInvalidParamErrors;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.reservation.service.ReservationManagement;
import com.ddbb.dingdong.infrastructure.auth.encrypt.token.TokenManager;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RequestGeneralReservationUseCase implements UseCase<RequestGeneralReservationUseCase.Param, RequestGeneralReservationUseCase.Result> {
    private final TokenManager tokenManager;
    private final ReservationManagement reservationManagement;

    @Override
    public Result execute(Param param) {
        param.validate();
        checkHasDuplicatedReservation(param);
        validateReservationDates(param);
        String token = generateToken(param);

        return new Result(token);
    }

    private String generateToken(Param param) {
        return tokenManager.generateToken(param);
    }

    private void checkHasDuplicatedReservation(Param param) {
        Long userId = param.userId;
        List<LocalDateTime> hopeTimes = param.reservationDates
                .stream()
                .map(reservationInfo -> reservationInfo.date)
                .toList();

        reservationManagement.checkHasDuplicatedReservations(userId, hopeTimes);
    }

    private void validateReservationDates(Param param) {
        List<LocalDateTime> reservationDates = param.getReservationDates().stream().map(Param.ReservationInfo::getDate).toList();
        for(LocalDateTime date : reservationDates) {
            reservationManagement.validateGeneralReservationDate(date, param.getDirection());
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Direction direction;
        private List<ReservationInfo> reservationDates;

        @Getter
        @AllArgsConstructor
        public static class ReservationInfo {
            @JsonSerialize(using = LocalDateTimeSerializer.class)
            @JsonDeserialize(using = LocalDateTimeDeserializer.class)
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
            private LocalDateTime date;

            public boolean equals(ReservationInfo o) {
                return o.date.isEqual(this.date);

            }
        }

        @Override
        public boolean validate() {
            boolean hasDuplicates = reservationDates.stream()
                    .map(Param.ReservationInfo::getDate)
                    .collect(Collectors.toSet()).size() < reservationDates.size();
            if (hasDuplicates) {
                throw ReservationInvalidParamErrors.DUPLICATED_DATES.toException();
            }

            return true;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        private String token;
    }
}
