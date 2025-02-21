package com.ddbb.dingdong.domain.reservation.service.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AllocationFailedEvent {
    private Long reservationId;
    private Long userId;
}
