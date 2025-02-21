package com.ddbb.dingdong.domain.transportation.repository;

import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.transportation.entity.BusStop;
import com.ddbb.dingdong.domain.transportation.repository.projection.AllAvailableBusStopProjection;
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
            "bst.expectedArrivalTime as busStopTime, b.id as busId, bs.id as busScheduleId, bst.locationId as locationId " +
            "FROM BusStop bst " +
            "JOIN Ticket t ON t.busStopId = bst.id " +
            "JOIN BusSchedule bs ON t.busScheduleId = bs.id " +
            "JOIN Bus b ON b.id = bs.bus.id " +
            "WHERE ((bs.direction = 'TO_HOME' AND bs.departureTime = :time) OR " +
                "(bs.direction = 'TO_SCHOOL' AND bs.arrivalTime = :time)) " +
            "AND bs.schoolId = :schoolId " +
            "AND bs.status = 'READY'" +
            "AND bs.direction = :direction"
    )
    List<AvailableBusStopProjection> findAvailableBusStop(
            @Param("direction") Direction direction,
            @Param("time") LocalDateTime time,
            @Param("schoolId") Long schoolId
    );


    @Query("SELECT bst.latitude as latitude, bst.longitude as longitude, " +
            "busSchedule.id as busScheduleId, " +
            "CASE WHEN busSchedule.direction = 'TO_SCHOOL' " +
            "THEN busSchedule.arrivalTime ELSE busSchedule.departureTime END AS busScheduleTime, " +
            "bst.locationId as locationId " +
            "FROM BusStop bst " +
            "JOIN Ticket t ON t.busStopId = bst.id " +
            "JOIN BusSchedule busSchedule ON t.busScheduleId = busSchedule.id " +
            "WHERE busSchedule.direction = :direction " +
            "AND busSchedule.schoolId = :schoolId " +
            "AND busSchedule.status = 'READY'")
    List<AllAvailableBusStopProjection> findAllAvailableBusStop(
            @Param("direction") Direction direction,
            @Param("schoolId") Long schoolId
    );

    @Query("""
    SELECT t.reservation.userId AS userId, t.reservation.id AS reservationId
    FROM Ticket t
    WHERE t.busStopId IN :busStops
    """)
    List<UserIdAndReservationIdProjection> queryUserIdByBusStops(@Param("busStops") List<Long> busStops);
}
