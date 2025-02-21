package com.ddbb.dingdong.domain.transportation.repository.projection;

public interface PathSegmentProjection {
    int getMeter();
    int getSecond();
    double getLongitude();
    double getLatitude();
    Long getLineId();
}
