package com.ddbb.dingdong.presentation.endpoint.reservation.exchanges;

import lombok.Data;

@Data
public class TogetherReservationRequestDTO {
    private Long busStopId;
    private Long busScheduleId;
}
