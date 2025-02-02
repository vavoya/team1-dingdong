package com.ddbb.dingdong.simulator.segment;

import com.ddbb.dingdong.simulator.RouteSegment;

import java.time.LocalDateTime;
import java.util.List;

public interface RouteSegmentProvider {
    List<RouteSegment> getRouteSegments(LocalDateTime startTime);
}
