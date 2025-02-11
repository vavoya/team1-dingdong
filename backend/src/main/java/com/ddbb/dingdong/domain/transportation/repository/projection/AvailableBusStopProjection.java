package com.ddbb.dingdong.domain.transportation.repository.projection;

import java.time.LocalDateTime;

public interface AvailableBusStopProjection {
    LocalDateTime getBusStopTime();
    String getBusStopName();
    Double getLongitude();
    Double getLatitude();
    String getBusName();
    Long getBusScheduleId();
}
