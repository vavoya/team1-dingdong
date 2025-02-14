package com.ddbb.dingdong.domain.notification.service;

import com.ddbb.dingdong.domain.auth.service.event.SignUpSuccessEvent;
import com.ddbb.dingdong.domain.notification.entity.vo.NotificationType;
import com.ddbb.dingdong.domain.reservation.service.event.AllocationFailedEvent;
import com.ddbb.dingdong.domain.reservation.service.event.AllocationSuccessEvent;
import com.ddbb.dingdong.infrastructure.webSocket.repository.SocketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class NotificationEventListener {
    private final NotificationManagement notificationManagement;
    private final SocketRepository socketRepository;
    private static final int TICKET_PRICE = 1000;
    private static final int WELCOME_MONEY = 10000;
    private static final String ALARM_SOCKET_MSG = "alarm";

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @EventListener
    protected void sendAllocationSuccessNotification(AllocationSuccessEvent event) {
        notificationManagement.sendNotification(NotificationType.ALLOCATION_SUCCESS, event.getUserId(), event.getReservationId(), null);
        sendAlarm(event.getUserId());
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @EventListener
    protected void sendAllocationFailNotification(AllocationFailedEvent event) {
        notificationManagement.sendNotification(NotificationType.ALLOCATION_FAILED, event.getUserId(), event.getReservationId(), TICKET_PRICE);
        sendAlarm(event.getUserId());
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @EventListener
    protected void sendWelcomeNotification(SignUpSuccessEvent event) {
        notificationManagement.sendNotification(NotificationType.ALLOCATION_FAILED, event.getUserId(), null, WELCOME_MONEY);
        sendAlarm(event.getUserId());
    }

    private void sendAlarm(Long userId) {
        WebSocketSession socket = socketRepository.get(userId);

        if(socket != null && socket.isOpen()) {
            int retryTimes = 0;
            while (retryTimes < 3) {
                try {
                    socket.sendMessage(new TextMessage(ALARM_SOCKET_MSG));
                    break;
                } catch (IOException e) {
                    retryTimes++;
                }
            }
        }
    }
}
