package com.ddbb.dingdong.presentation.endpoint.reservation.exchanges;

import lombok.Data;

@Data
public class TogetherReservationConfirmDTO {
    private String token;
    private Long busStopId;
    private Long busScheduleId;
}
