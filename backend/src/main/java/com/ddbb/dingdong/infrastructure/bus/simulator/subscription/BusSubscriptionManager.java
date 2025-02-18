package com.ddbb.dingdong.infrastructure.bus.simulator.subscription;

import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.transportation.service.BusErrors;
import com.ddbb.dingdong.infrastructure.bus.simulator.BusSubscriptionLockManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.SubmissionPublisher;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusSubscriptionManager {
    private final BusSubscriptionLockManager lockManager;
    private final Map<Long, SubmissionPublisher<Point>> publishers = new HashMap<>();
    private final Map<Long, Set<UserSubscription>> subscribers = new HashMap<>();


    public void subscribe(long busId, UserSubscription subscription) {
        StoppableLock lock = lockManager.getLock(busId)
                .orElseThrow(() -> new DomainException(BusErrors.BUS_NOT_INITIATED));
        if (!lock.lock()) {
            throw new DomainException(BusErrors.BUS_ALREADY_STOPPED);
        }
        Set<UserSubscription> set = subscribers.computeIfAbsent(busId, id -> new TreeSet<>());
        set.add(subscription);

        publishers.computeIfPresent(busId, (key, publisher) -> {
           publisher.subscribe(subscription.getSubscriber());
           return publisher;
        });
        lock.unlock();
    }

    public void addPublishers(Long busId, SubmissionPublisher<Point> publisher) {
        StoppableLock lock = lockManager.getLock(busId)
                .orElseThrow(() -> new DomainException(BusErrors.BUS_NOT_INITIATED));
        if (!lock.lock()) {
            throw new DomainException(BusErrors.BUS_ALREADY_STOPPED);
        }
        if (!publishers.containsKey(busId)) {
            Set<UserSubscription> subscriberSet = subscribers.computeIfAbsent(busId, (id) -> new TreeSet<>());
            for (UserSubscription subscription : subscriberSet) {
                publisher.subscribe(subscription.getSubscriber());
            }
            publishers.put(busId, publisher);
        }
        lock.unlock();
    }

    public void unsubscribe(Long busId, Long userId) {
        StoppableLock lock = lockManager.getLock(busId)
                .orElseThrow(() -> new DomainException(BusErrors.BUS_NOT_INITIATED));
        if (!lock.lock()) {
            throw new DomainException(BusErrors.BUS_ALREADY_STOPPED);
        }
        subscribers.computeIfPresent(busId, (id, subscriberSet) -> {
            subscriberSet.removeIf(subscription -> {
                if (subscription.getUserId().equals(userId)) {
                    log.debug("user ({}) unsubscribe bus ({})", subscription.getUserId(), busId);
                    subscription.getSubscriber().cancel();
                    return true;
                }
                return false;
            });
            return subscriberSet;
        });
        lock.unlock();
    }

    /**
     * @param busId : 메모리에서 지울 publisher의 버스 아이디
     * 매개변수로 들어온 버스아이디와 관련된 publisher과 관련된 자원(Subscriber 등)의 메모리를 해제합니다.
     * 자동으로 publisher의 close를 호출하므로 동일한 publisher에 대해서 close 메서드를 재호출하지 않아야 합니다.
     *
     * 반드시 버스 구독 락을 제거하기 전에 호출해야 합니다.
     * **/
    public void cleanPublisher(Long busId) {
        StoppableLock lock = lockManager.getLock(busId)
                .orElseThrow(() -> new DomainException(BusErrors.BUS_NOT_INITIATED));
        if (!lock.lock()) {
            throw new DomainException(BusErrors.BUS_ALREADY_STOPPED);
        }
        SubmissionPublisher<Point> publisher = publishers.remove(busId);
        subscribers.remove(busId);
        publisher.close();
        lock.unlock();
    }

    /**
     * @param busId : 참조를 제거할 publisher의 버스 아이디
     * 매개변수로 들어온 버스아이디와 관련된 publisher와 연관된 subscriber들의 참조를 제거합니다.
     * publisher의 close를 호출하지 않으므로 반드시 해당 publisher에 close 메서드를 호출해야 합니다.
     **/
    public void removeRefOnly(Long busId) {
        StoppableLock lock = lockManager.getLock(busId)
                .orElseThrow(() -> new DomainException(BusErrors.BUS_NOT_INITIATED));
        if (!lock.lock()) {
            throw new DomainException(BusErrors.BUS_ALREADY_STOPPED);
        }
        publishers.remove(busId);
        subscribers.remove(busId);
        lock.unlock();
    }
}
