package com.ddbb.dingdong.domain.transportation.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class BusStopTime {
    private Long busStopId;
    private LocalDateTime time;
}
