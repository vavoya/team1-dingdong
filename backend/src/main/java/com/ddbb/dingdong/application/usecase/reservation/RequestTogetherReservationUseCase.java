package com.ddbb.dingdong.application.usecase.reservation;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.application.usecase.reservation.error.ReservationInvalidParamErrors;
import com.ddbb.dingdong.infrastructure.auth.encrypt.TokenManager;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RequestTogetherReservationUseCase implements UseCase<RequestTogetherReservationUseCase.Param, RequestTogetherReservationUseCase.Result> {
    private final TokenManager tokenManager;

    @Override
    public Result execute(Param param) {
        param.validate();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String data = objectMapper.writeValueAsString(param);
            String encryptedReservationInfo = tokenManager.generateToken(data);
            return new Result(encryptedReservationInfo);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Long busStopId;
        private Long busScheduleId;

        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonDeserialize(using = LocalDateTimeDeserializer.class)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime date;

        @Override
        public boolean validate() {
            if (date == null) {
                throw ReservationInvalidParamErrors.NOT_SINGLE_RESERVATION_DATES.toException();
            }
            if (!validateReservationDate(date)) throw ReservationInvalidParamErrors.INVALID_DATE.toException();

            return true;
        }

        private static boolean validateReservationDate(LocalDateTime date) {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime minDate, maxDate;
            minDate = date.minusHours(48);
            maxDate = date.minusHours(2);

            if (now.isBefore(minDate) || now.isAfter(maxDate)) {
                return false;
            }
            if (date.getMinute() != 0 && date.getMinute() != 30) {
                return false;
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
