package com.ddbb.dingdong.simulator.subscription.publisher;

import com.ddbb.dingdong.simulator.subscription.BusSubscriptionManager;

import java.util.concurrent.*;
import java.util.function.Supplier;

public class PeriodicBusPublisher<T> extends SubmissionPublisher<T> {
    private final BusSubscriptionManager manager;
    private final long busId;
    private final ScheduledExecutorService scheduler;
    private final ScheduledFuture<?> periodicTask;

    public PeriodicBusPublisher(
            BusSubscriptionManager manager, long busId,
            Supplier<T> supplier, long period, long initialDelay, TimeUnit unit
    ) {
        super();
        this.manager = manager;
        this.busId = busId;
        this.scheduler = Executors.newSingleThreadScheduledExecutor();
        this.periodicTask = scheduler.scheduleAtFixedRate(() -> {
            T item = supplier.get();
            if (item == null) {
                this.close();
                return;
            }
            submit(item);
        }, initialDelay, period, unit);
    }

    public void close() {
        periodicTask.cancel(false);
        scheduler.shutdown();
        manager.cleanPublisher(busId);
        super.close();
    }
}
