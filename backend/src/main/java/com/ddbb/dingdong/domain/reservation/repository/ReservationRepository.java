package com.ddbb.dingdong.domain.reservation.repository;

import com.ddbb.dingdong.domain.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r , Location l WHERE l.clusterLabel = :clusterLabel AND r.id = l.reservationId")
    List<Reservation> findAllByClusterLabel(@Param("clusterLabel") String clusterLabel);

    @Query("""
    SELECT COUNT(r) > 0
    FROM Reservation r
    WHERE (
        (r.direction = 'TO_SCHOOL' AND r.arrivalTime = :time)
        OR
        (r.direction = 'TO_HOME' AND r.departureTime = :time)
    )
    AND r.userId = :userId
    AND CAST(r.status AS STRING) IN ('PENDING', 'ALLOCATED')
    """)
    boolean existsActiveReservation(@Param("time") LocalDateTime time, @Param("userId") Long userId);
}
