package com.ddbb.dingdong.infrastructure.bus.simulator.segment;

import com.ddbb.dingdong.infrastructure.bus.simulator.RouteSegment;

import java.time.LocalDateTime;
import java.util.List;

public interface RouteSegmentProvider {
    List<RouteSegment> getRouteSegments(LocalDateTime startTime);
}
