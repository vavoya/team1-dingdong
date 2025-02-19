package com.ddbb.dingdong.domain.transportation.repository.projection;

import java.time.LocalDateTime;

public interface AvailableBusStopProjection {
    Long getBusStopId();
    LocalDateTime getBusStopTime();
    String getBusStopName();
    Double getLongitude();
    Double getLatitude();
    Long getBusId();
    Long getBusScheduleId();
    Long getLocationId();
}
