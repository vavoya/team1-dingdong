package com.ddbb.dingdong.domain.notification.service;

import com.ddbb.dingdong.domain.notification.entity.Notification;
import com.ddbb.dingdong.domain.notification.entity.vo.NotificationType;
import com.ddbb.dingdong.domain.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NotificationManagement {
    private final NotificationRepository notificationRepository;

    public boolean hasUnreadNotifications(Long userId) {
        return notificationRepository.existsByUserIdAndIsReadFalse(userId);
    }

    public void readAllNotifications(Long userId) {
        List<Notification> notifications = notificationRepository.findAllByUserIdAndIsReadFalse(userId);
        notifications.forEach(Notification::read);

        notificationRepository.saveAll(notifications);
    }

    public void sendNotification(NotificationType type, Long userId, Long reservationId) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setReservationId(reservationId);
        notification.setType(type);

        notificationRepository.save(notification);
    }
}
