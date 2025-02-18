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
            WHEN n.type = 'BUS_START' THEN bs.expectedArrivalTime
            WHEN r.direction = 'TO_HOME' THEN r.departureTime
            ELSE l.expectedArrivalTime
        END AS expectedStartTime,
        CASE
            WHEN n.type = 'BUS_START' THEN busSchedule.arrivalTime
            WHEN r.direction = 'TO_HOME' THEN l.expectedArrivalTime
            ELSE r.arrivalTime
        END AS expectedEndTime
    FROM Notification n
    JOIN User u ON n.userId = u.id
    LEFT JOIN Reservation r ON n.reservationId = r.id
    LEFT JOIN BusSchedule busSchedule ON r.ticket.busScheduleId = busSchedule.id
    LEFT JOIN BusStop bs ON r.ticket.busStopId = bs.id
    LEFT JOIN Location l ON l.id = bs.locationId
    WHERE n.userId = :userId
    ORDER BY n.createdAt DESC
    """)
    Page<NotificationProjection> queryUserNotifications(@Param("userId") Long userId, Pageable pageable);
}
