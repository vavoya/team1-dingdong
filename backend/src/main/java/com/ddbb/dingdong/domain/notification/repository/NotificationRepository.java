package com.ddbb.dingdong.domain.notification.repository;

import com.ddbb.dingdong.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByUserIdAndIsReadFalse(Long userId);

    boolean existsByUserIdAndIsReadFalse(Long userId);
}
