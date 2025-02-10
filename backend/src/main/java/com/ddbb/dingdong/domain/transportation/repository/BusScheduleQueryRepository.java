package com.ddbb.dingdong.domain.transportation.repository;

import com.ddbb.dingdong.domain.transportation.entity.BusSchedule;
import com.ddbb.dingdong.domain.transportation.repository.projection.BusReservedSeatProjection;
import com.ddbb.dingdong.domain.transportation.repository.projection.ScheduleTimeProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusScheduleQueryRepository extends JpaRepository<BusSchedule, Long> {
    @Query("SELECT DISTINCT bs.arrivalTime as time FROM BusSchedule bs WHERE bs.schoolId = :schoolId and bs.status = 'READY'")
    List<ScheduleTimeProjection> findAvailableGoSchoolBusTime(@Param("schoolId") Long schoolId);

    @Query("SELECT DISTINCT bs.departureTime as time FROM BusSchedule bs WHERE bs.schoolId = :schoolId and bs.status = 'READY'")
    List<ScheduleTimeProjection> findAvailableGoHomeBusTime(@Param("schoolId") Long schoolId);

    @Query("SELECT COUNT(t.id) as reservedSeatCount , bs.id as busScheduleId " +
            "FROM Ticket t " +
            "JOIN BusSchedule bs ON t.busScheduleId = bs.id " +
            "JOIN Reservation r ON t.id = r.ticket.id " +
            "WHERE bs.id in :busScheduleIds " +
            "AND r.status != 'CANCELED' " +
            "GROUP BY bs.id")
    List<BusReservedSeatProjection> findReservedSeatCount(@Param("busScheduleIds") List<Long> busScheduleIds);
}
