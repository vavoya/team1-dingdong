package com.ddbb.dingdong.simulator.subscription.publisher;

import java.util.concurrent.*;
import java.util.function.Supplier;

public class PeriodicBusPublisher<T> extends SubmissionPublisher<T> {
    private final ScheduledExecutorService scheduler;
    private final ScheduledFuture<?> periodicTask;

    public PeriodicBusPublisher(Supplier<T> supplier, long period, long initialDelay, TimeUnit unit) {
        super();
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
        super.close();
    }
}
