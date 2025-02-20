package com.ddbb.dingdong.infrastructure.bus.simulator;


import com.ddbb.dingdong.infrastructure.bus.simulator.subscription.StoppableLock;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class BusSubscriptionLockManager {
    private final Map<Long, StoppableLock> locks = new ConcurrentHashMap<>();

    public Optional<StoppableLock> getLock(long busScheduleId) {
        StoppableLock stampedLock = locks.get(busScheduleId);
        return Optional.ofNullable(stampedLock);
    }

    public void addLock(long busScheduleId) {
        locks.computeIfAbsent(busScheduleId, id -> new StoppableLock());
    }

    public void removeLock(long busScheduleId) {
        StoppableLock lock = locks.remove(busScheduleId);
        if (lock != null) {
            lock.stopAndWait();
        }
    }
}
