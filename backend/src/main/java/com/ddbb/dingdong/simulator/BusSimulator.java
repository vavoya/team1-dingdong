package com.ddbb.dingdong.simulator;

import org.springframework.data.geo.Point;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class BusSimulator{
    private final List<Point> simulatedPoints;
    private int currentPosition = 0;

    public BusSimulator(List<Point> simulatedPoints) {
        this.simulatedPoints = simulatedPoints;
    }
}
