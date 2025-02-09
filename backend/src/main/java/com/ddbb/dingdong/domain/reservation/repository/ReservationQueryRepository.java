package com.ddbb.dingdong.domain.reservation.repository;

import com.ddbb.dingdong.domain.reservation.entity.Reservation;
import com.ddbb.dingdong.domain.reservation.repository.projection.UserReservationLocationProjection;
import com.ddbb.dingdong.domain.reservation.repository.projection.UserReservationProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationQueryRepository extends JpaRepository<Reservation, Long> {
    @Query("""
        SELECT u.home.stationName AS userHomeStationName,
               r.id AS reservationId,
               r.startDate AS startDate,
               r.direction AS direction,
               r.arrivalTime AS expectedArrivalTime,
               r.status AS reservationStatus,
               b.name AS busName,
               bs_arrival.status AS busStatus,
               bs.roadNameAddress AS busStopRoadNameAddress,
               bs.expectedArrivalTime AS busStopArrivalTime,
               p.totalMinutes AS totalMinutes
        FROM Reservation r
        LEFT JOIN Ticket t ON r.id = t.reservation.id
        LEFT JOIN BusStop bs ON t.busStopId = bs.id
        LEFT JOIN BusSchedule bs_arrival ON bs_arrival.id = t.busScheduleId
        LEFT JOIN Bus b ON bs_arrival.bus.id = b.id
        LEFT JOIN Path p ON p.busSchedule.id = bs_arrival.id
        LEFT JOIN User u ON r.userId = :userId
        WHERE r.userId = :userId
            AND (
                (:category = 0)
                OR
                (:category = 1 AND CAST(r.status AS STRING) = 'ALLOCATED')
                OR
                (:category = 2 AND CAST(r.status AS STRING) = 'PENDING')
                OR
                (:category = 3 AND CAST(r.status AS STRING) = 'NOT_ALLOCATED')
                OR
                (:category = 4 AND CAST(bs_arrival.status AS STRING) = 'ENDED')
                OR
                (:category = 5 AND CAST(r.status AS STRING) = 'CANCELED')
                )
            ORDER BY
               CASE WHEN :sort = 0 THEN r.startDate END DESC,
               CASE WHEN :sort = 1 THEN r.startDate END ASC
        """)
    Page<UserReservationProjection> findFlatReservationsByUserId(@Param("userId") Long userId, @Param("category") int category, @Param("sort") int sort, Pageable p);

    @Query("""
        SELECT r.id AS reservationId,
               u.home.stationLatitude AS userLat,
               u.home.stationLongitude AS userLon
        FROM Reservation r
        LEFT JOIN User u ON r.userId = u.id
        WHERE (
                 (:direction = 0) AND (CAST(r.direction AS STRING) = 'TO_SCHOOL') AND (:dingdongTime = r.arrivalTime)
                 OR
                 (:direction = 1) AND (CAST(r.direction AS STRING) = 'TO_HOME') AND (:dingdongTime = r.departureTime)
                )
            AND CAST(r.type AS STRING) = 'GENERAL'
            AND CAST(r.status AS STRING) = 'PENDING'
        """)

    List<UserReservationLocationProjection> findUsersAndLocationsAndReservations(@Param("direction") int direction, @Param("dingdongTime")LocalDateTime dingdongTime);
}
