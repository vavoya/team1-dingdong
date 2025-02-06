package com.ddbb.dingdong.simulator;

import org.springframework.data.geo.Point;

import java.util.List;

public record RouteSegment(
        List<Point> points,
        int distance,
        int time
) {
}
