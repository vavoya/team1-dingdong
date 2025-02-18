package com.ddbb.dingdong.domain.transportation.service.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserBusStopTime {
    private Long busStopId;
    private LocalDateTime time;

    public UserBusStopTime(Long busStopId, LocalDateTime time) {
        this.busStopId = busStopId;
        this.time = time;
    }

    public UserBusStopTime ofTime(LocalDateTime time) {
        return new UserBusStopTime(busStopId, time);
    }
}
