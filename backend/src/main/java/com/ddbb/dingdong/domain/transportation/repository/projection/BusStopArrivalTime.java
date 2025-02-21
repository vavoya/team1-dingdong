package com.ddbb.dingdong.domain.transportation.repository.projection;

import java.time.LocalDateTime;

public interface BusStopArrivalTime {
    Long getUserId();
    LocalDateTime getArrivalTime();
}
