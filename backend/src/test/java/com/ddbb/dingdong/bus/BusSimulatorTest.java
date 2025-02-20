package com.ddbb.dingdong.bus;

import com.ddbb.dingdong.infrastructure.bus.simulator.BusSubscriptionLockManager;
import com.ddbb.dingdong.infrastructure.bus.subscription.BusSubscriptionManager;
import com.ddbb.dingdong.infrastructure.bus.subscription.UserSubscription;
import com.ddbb.dingdong.domain.transportation.service.BusPublishService;
import com.ddbb.dingdong.infrastructure.bus.simulator.segment.RouteSegmentProvider;
import com.ddbb.dingdong.infrastructure.bus.simulator.segment.impl.TMapStubRouteSegmentProvider;
import com.ddbb.dingdong.infrastructure.bus.simulator.BusSimulatorFactory;
import com.ddbb.dingdong.infrastructure.bus.subscription.subscriber.StubConsoleSubscriber;
import org.junit.jupiter.api.Test;

import java.util.concurrent.*;

class BusSimulatorTest {
    private BusSubscriptionManager manager;
    private BusPublishService publishService;
    private BusSimulatorFactory factory;
    private RouteSegmentProvider segmentProvider;

    public BusSimulatorTest() {
        this.segmentProvider = new TMapStubRouteSegmentProvider();
        this.manager = new BusSubscriptionManager(new BusSubscriptionLockManager());
        this.factory = new BusSimulatorFactory(segmentProvider);
        this.publishService = new BusPublishService(this.factory, manager);
    }

    @Test()
    void test() throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(13);
        CountDownLatch countDownLatch = new CountDownLatch(1);
        for (int i = 0; i < 3; i++) {
            int finalI = i;
            executor.submit(() -> {
                try {
                    countDownLatch.await();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                this.manager.subscribe(0, new UserSubscription((long)finalI, new StubConsoleSubscriber()));
            });
        }
        executor.submit(() -> {
            try {
                countDownLatch.await();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            publishService.publishSimulator(0L, 1L, 0L, TimeUnit.SECONDS);
        });
        executor.submit(() -> {
            try {
                countDownLatch.await();
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            this.manager.subscribe(0L,new UserSubscription((long)0, new StubConsoleSubscriber()));
        });

        executor.submit(() -> {
            try {
                countDownLatch.await();
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            this.manager.unsubscribe(0L,1L);
        });
        executor.submit(() -> {
            try {
                countDownLatch.await();
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            this.manager.cleanPublisher(0L);
        });
        countDownLatch.countDown();
        Thread.sleep(5000);
    }
}