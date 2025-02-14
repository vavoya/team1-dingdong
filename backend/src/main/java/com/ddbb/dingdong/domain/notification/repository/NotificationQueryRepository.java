package com.ddbb.dingdong.domain.notification.repository;

import com.ddbb.dingdong.domain.notification.entity.Notification;
import com.ddbb.dingdong.domain.notification.repository.projection.NotificationProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotificationQueryRepository extends JpaRepository<Notification, Long> {
    @Query("""
    SELECT
        n.createdAt AS timeStamp,
        n.type AS type,
        n.money AS money,
        n.isRead AS isRead,
        r.id AS reservationId,
        CASE
            WHEN r.direction = 'TO_SCHOOL' THEN l.stationName
            ELSE u.school.name
        END AS startStationName,
        CASE
            WHEN r.direction = 'TO_SCHOOL' THEN u.school.name
            ELSE l.stationName
        END AS endStationName,
        r.startDate AS startDate,
        CASE
            WHEN r.direction = 'TO_SCHOOL' THEN bs.expectedArrivalTime
            ELSE r.departureTime
        END AS expectedStartTime,
        CASE
            WHEN r.direction = 'TO_SCHOOL' THEN r.arrivalTime
            ELSE bs.expectedArrivalTime
        END AS expectedEndTime
    FROM Notification n
    JOIN User u ON n.userId = u.id
    LEFT JOIN Reservation r ON n.reservationId = r.id
    LEFT JOIN Location l ON l.reservationId = r.id
    LEFT JOIN BusStop bs ON bs.locationId = l.id
    WHERE n.userId = :userId
    ORDER BY n.createdAt DESC
    """)
    Page<NotificationProjection> queryUserNotifications(@Param("userId") Long userId, Pageable pageable);
}
