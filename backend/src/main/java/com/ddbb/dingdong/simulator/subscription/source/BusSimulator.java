package com.ddbb.dingdong.simulator.subscription.source;

import org.springframework.data.geo.Point;

import java.util.List;

public class BusSimulator{
    private final List<Point> simulatedPoints;
    private int currentPosition = 0;

    public BusSimulator(List<Point> simulatedPoints) {
        this.simulatedPoints = simulatedPoints;
    }
}
