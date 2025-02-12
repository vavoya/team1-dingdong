package com.ddbb.dingdong.domain.transportation.repository.projection;

import java.time.LocalDateTime;

public interface UserBusStopProjection {
    Long getUserId();
    LocalDateTime getBusStopArrivalTime();
    Long getBusStopId();
}
