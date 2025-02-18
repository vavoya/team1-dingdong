package com.ddbb.dingdong.infrastructure.bus.simulator.subscription;

import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.transportation.service.BusErrors;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
public class StoppableLock {
    private static final long BUSY_WAIT_INTERVAL_MILLIS = 100L;
    private final ReentrantLock lock = new ReentrantLock(true);
    private final AtomicBoolean isStopped = new AtomicBoolean(false);

    /**
     * 이미 stop된 상태라면 바로 false를 반환하고,
     * lock을 얻고 stop 된 상태라면 바로 lock을 반납하고 false를 반환합니다.
     * true를 반환하면 외부에서 반드시 unlock을 해야합니다.
     * **/
    public boolean lock() {
        if (isStopped.get()) {
            return false;
        }
        lock.lock();
        if (isStopped.get()) {
            lock.unlock();
            return false;
        }
        return true;
    }

    public void unlock() {
        if (lock.isHeldByCurrentThread()) {
            lock.unlock();
        }
    }

    public void stopAndWait() {
        isStopped.set(true);
        while (lock.hasQueuedThreads()) {
            try {
                TimeUnit.MILLISECONDS.sleep(BUSY_WAIT_INTERVAL_MILLIS);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.debug(e.getMessage());
                throw new DomainException(BusErrors.STOP_BUS_ERROR);
            }
        }
    }

    public boolean isStopped() {
        return isStopped.get();
    }
}
