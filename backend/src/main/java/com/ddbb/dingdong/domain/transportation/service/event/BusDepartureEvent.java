package com.ddbb.dingdong.domain.transportation.service.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class BusDepartureEvent {
    private LocalDateTime arrivalTime;
    private List<Long> userIds;
}
