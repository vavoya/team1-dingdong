package com.ddbb.dingdong.domain.notification.repository.projection;

import com.ddbb.dingdong.domain.notification.entity.vo.NotificationType;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface NotificationProjection {
    NotificationType getType();
    Boolean getIsRead();
    Long getReservationId();
    String getStartStationName();
    String getEndStationName();
    LocalDateTime getTimeStamp();
    LocalDate getStartDate();
    LocalDateTime getExpectedStartTime();
    LocalDateTime getExpectedEndTime();
}
