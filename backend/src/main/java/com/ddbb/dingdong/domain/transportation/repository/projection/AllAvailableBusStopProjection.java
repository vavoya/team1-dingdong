package com.ddbb.dingdong.domain.transportation.repository.projection;

import java.time.LocalDateTime;

public interface AllAvailableBusStopProjection {
    Double getLongitude();
    Double getLatitude();
    Long getBusScheduleId();
    LocalDateTime getBusScheduleTime();
}
