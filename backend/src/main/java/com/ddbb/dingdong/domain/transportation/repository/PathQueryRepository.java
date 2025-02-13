package com.ddbb.dingdong.domain.transportation.repository;

import com.ddbb.dingdong.domain.transportation.entity.Path;
import com.ddbb.dingdong.domain.transportation.repository.projection.PathPointProjection;
import com.ddbb.dingdong.domain.transportation.repository.projection.PathSegmentProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT " +
            "point.latitude as latitude, point.longitude as longitude, " +
            "line.id as lineId, line.totalMeters as meter, line.totalSeconds as second " +
            "FROM Point point " +
            "JOIN Line line ON line.id = point.line.id " +
            "JOIN Path path on path.id = line.path.id " +
            "JOIN BusSchedule bs on bs.id = path.busSchedule.id " +
            "WHERE bs.id = :busScheduleId " +
            "ORDER BY line.sequence, point.sequence")
    List<PathSegmentProjection> findSegmentByBusScheduleId(@Param("busScheduleId") Long busScheduleId);
}
