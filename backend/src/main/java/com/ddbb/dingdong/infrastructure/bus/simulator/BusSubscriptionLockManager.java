package com.ddbb.dingdong.infrastructure.bus.simulator;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.StampedLock;

@Component
public class BusSubscriptionLockManager {
    private final Map<Long, StampedLock> locks = new ConcurrentHashMap<>();

    public Optional<StampedLock> getLock(long busScheduleId) {
        StampedLock stampedLock = locks.get(busScheduleId);
        return Optional.ofNullable(stampedLock);
    }

    public void addLock(long busScheduleId) {
        locks.computeIfAbsent(busScheduleId, id -> new StampedLock());
    }

    public void removeLock(long busScheduleId) {
        locks.remove(busScheduleId);
    }
}
