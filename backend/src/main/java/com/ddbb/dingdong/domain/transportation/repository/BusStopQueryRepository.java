package com.ddbb.dingdong.domain.transportation.repository;

import com.ddbb.dingdong.domain.transportation.entity.BusStop;
import com.ddbb.dingdong.domain.transportation.repository.projection.AvailableBusStopProjection;
import com.ddbb.dingdong.domain.transportation.repository.projection.UserIdAndReservationIdProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BusStopQueryRepository extends JpaRepository<BusStop, Long> {
    @Query("SELECT bst.id as busStopId, bst.roadNameAddress as busStopName, bst.latitude as latitude, bst.longitude as longitude, " +
            "bst.expectedArrivalTime as busStopTime, b.name as busName, bs.id as busScheduleId " +
            "FROM BusStop bst " +
            "JOIN Ticket t ON t.busStopId = bst.id " +
            "JOIN BusSchedule bs ON t.busScheduleId = bs.id " +
            "JOIN Bus b ON b.id = bs.bus.id " +
            "WHERE bs.departureTime = :departureTime AND bs.schoolId = :schoolId " +
            "AND bs.status = 'READY'")
    List<AvailableBusStopProjection> findAvailableGoHomeBusStop(
            @Param("departureTime") LocalDateTime departureTime,
            @Param("schoolId") Long schoolId
    );

    @Query("SELECT bst.id as busStopId, bst.roadNameAddress as busStopName, bst.latitude as latitude, bst.longitude as longitude, " +
            "bst.expectedArrivalTime as busStopTime, b.name as busName, bs.id as busScheduleId " +
            "FROM BusStop bst " +
            "JOIN Ticket t ON t.busStopId = bst.id " +
            "JOIN BusSchedule bs ON t.busScheduleId = bs.id " +
            "JOIN Bus b ON b.id = bs.bus.id " +
            "WHERE bs.arrivalTime = :arrivalTime AND bs.schoolId = :schoolId " +
            "AND bs.status = 'READY'")
    List<AvailableBusStopProjection> findAvailableGoSchoolBusStop(
            @Param("arrivalTime") LocalDateTime arrivalTime,
            @Param("schoolId") Long schoolId
    );

    @Query("""
    SELECT t.reservation.userId AS userId, t.reservation.id AS reservationId
    FROM Ticket t
    WHERE t.busStopId IN :busStops
    """)
    List<UserIdAndReservationIdProjection> queryUserIdByBusStops(@Param("busStops") List<Long> busStops);
}
