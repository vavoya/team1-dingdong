package com.ddbb.dingdong.infrastructure.bus.simulator.subscription.publisher;

import com.ddbb.dingdong.infrastructure.bus.simulator.BusSimulatorFactory;
import com.ddbb.dingdong.infrastructure.bus.simulator.subscription.BusSubscriptionManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.concurrent.SubmissionPublisher;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

/**
 * 실제 버스 GPS 좌표를 받아오는 구현체도 이 팩터리 객체를 통해서 생성하여 생성 로직을 추상화
 * **/
@Service
@RequiredArgsConstructor
public class BusPublishService {
    private final BusSimulatorFactory busSimulatorFactory;
    private final BusSubscriptionManager manager;

    public void publishSimulator(
            Long busScheduleId,
            Long interval,
            Long initialDelay,
            TimeUnit timeUnit
    ) {
        Supplier<Point> supplier =  busSimulatorFactory.create(busScheduleId);
        SubmissionPublisher<Point> publisher = new PeriodicBusPublisher<>(manager, busScheduleId, supplier, interval, initialDelay, timeUnit);
        manager.addPublishers(busScheduleId, publisher);
    }
}
