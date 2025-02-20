package com.ddbb.dingdong.infrastructure.bus.simulator.subscription;

import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.transportation.service.BusErrors;
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
public class StoppableLock {
    private final ReentrantLock lock = new ReentrantLock(true);
    private final Condition terminateCondition = lock.newCondition();
    private final AtomicInteger waitingCount = new AtomicInteger(0);
    private volatile boolean isStopped = false;

    /**
     * isStopped을 읽기만 합니다.
     * 이미 stop된 상태라면 바로 false를 반환하고,
     * lock을 얻고 stop 된 상태라면 바로 lock을 반납하고 false를 반환합니다.
     * true를 반환하면 외부에서 반드시 unlock을 해야합니다.
     * **/
    public boolean lock() {
        if (isStopped) {
            return false;
        }
        waitingCount.incrementAndGet();
        lock.lock();
        if (isStopped) {
            this.unlock();
            return false;
        }
        return true;
    }

    public void unlock() {
        if (lock.isHeldByCurrentThread()) {
            int count = this.waitingCount.decrementAndGet();
            if (count == 0) {
                terminateCondition.signal();
            }
            lock.unlock();
        }
    }

    /**
     * isStopped 의 값은 lock을 얻었을 때 True로 변화시킬 수 있고,
     * waitingCount 값은 lock을 얻었을 때 decrease 시킬 수 있고, 얻기 전엔 increase만 가능하다
     * 따라서 stop 스레드가 해당 락에 대기 중인 개수를 세고 나서 waiting count가 줄어들 수 없다. (항상 lock을 얻어야 하기 때문)
     * 따라서 stopAndWait 함수에서 적어도 실제 대기 중인 스레드가 없는데 기다리는 경우는 발생하지 않는다.
     * **/
    public void stopAndWait() {
        lock.lock();
        try {
            isStopped = true;
            while (waitingCount.get() > 0) {
                terminateCondition.await();
            }
        }
        catch (Exception e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            log.debug(e.getMessage());
            throw new DomainException(BusErrors.STOP_BUS_ERROR);
        }
        finally {
            if (lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    public boolean isStopped() {
        return isStopped;
    }
}
