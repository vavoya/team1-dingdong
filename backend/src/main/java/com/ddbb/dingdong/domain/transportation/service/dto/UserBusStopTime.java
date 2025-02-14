package com.ddbb.dingdong.domain.transportation.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class UserBusStopTime {
    private Long busStopId;
    private LocalDateTime time;
    private List<Long> userIds;

    public UserBusStopTime(Long busStopId, LocalDateTime time) {
        this.busStopId = busStopId;
        this.time = time;
        this.userIds = new ArrayList<>();
    }

    public UserBusStopTime ofTime(LocalDateTime time) {
        return new UserBusStopTime(busStopId, time, userIds);
    }

    public void addUserId(Long userId) {
        userIds.add(userId);
    }
}
