package com.ddbb.dingdong.infrastructure.notification;

import com.ddbb.dingdong.domain.reservation.service.event.AllocationFailedEvent;
import com.ddbb.dingdong.domain.reservation.service.event.AllocationSuccessEvent;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.projection.BusStopArrivalTime;
import com.ddbb.dingdong.domain.transportation.service.event.BusDepartureEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class WebPushNotificationEventListener {
    private final NotificationSender notificationSender;
    private final NotificationMessageFormatter messageFormatter;
    private final BusScheduleQueryRepository busScheduleQueryRepository;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    protected void sendAllocationSuccessNotification(AllocationSuccessEvent event) {
        NotificationMessage successMessage = messageFormatter.allocateSuccess();
        notificationSender.send(successMessage.title(), successMessage.content(), List.of(event.getUserId()));
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    protected void sendAllocationFailNotification(AllocationFailedEvent event) {
        NotificationMessage notificationMessage = messageFormatter.allocateFail();
        notificationSender.send(notificationMessage.title(), notificationMessage.content(), List.of(event.getUserId()));
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    protected void sendBusStartNotification(BusDepartureEvent event) {
        List<BusStopArrivalTime> arrivalTimes = busScheduleQueryRepository.findBusStopArrivalTime(event.getBusStopIds());
        arrivalTimes.stream()
                .collect(Collectors.groupingBy(BusStopArrivalTime::getArrivalTime, Collectors.toList()))
                .values()
                .forEach(entry -> {
                    LocalDateTime arrivalTime = entry.get(0).getArrivalTime();
                    NotificationMessage message = messageFormatter.busDeparture(arrivalTime, LocalDateTime.now());
                    List<Long> userIds = entry.stream().map(BusStopArrivalTime::getUserId)
                            .collect(Collectors.toSet())
                            .stream()
                            .toList();
                    notificationSender.send(message.title(), message.content(), userIds);
                });
    }
}
