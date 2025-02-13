package com.ddbb.dingdong.domain.transportation.repository;

import com.ddbb.dingdong.domain.transportation.entity.Path;
import com.ddbb.dingdong.domain.transportation.repository.projection.PathPointProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PathQueryRepository extends JpaRepository<Path, Long> {
    @Query("SELECT pt.longitude as longitude, pt.latitude as latitude " +
            "FROM Point pt " +
            "JOIN Line l ON l.id = pt.line.id " +
            "JOIN Path path ON path.id = l.path.id " +
            "JOIN BusSchedule bs ON bs.id = path.busSchedule.id " +
            "WHERE bs.id = :busScheduleId " +
            "ORDER BY l.sequence, pt.sequence")
    List<PathPointProjection> findPathPointsByPathId(Long busScheduleId);
}
