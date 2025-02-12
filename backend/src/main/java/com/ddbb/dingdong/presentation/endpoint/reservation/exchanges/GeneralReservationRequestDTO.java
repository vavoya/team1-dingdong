package com.ddbb.dingdong.presentation.endpoint.reservation.exchanges;

import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class GeneralReservationRequestDTO {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ReservationType type;
    private String direction;
    private List<ReservationInfo> dates;

    @Getter
    @NoArgsConstructor
    public static class ReservationInfo {
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonDeserialize(using = LocalDateTimeDeserializer.class)
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime date;
    }

    @Getter
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public enum Type {
        GENERAL,
        TOGETHER
    }
}
