package com.ddbb.dingdong.domain.transportation.service;

import com.ddbb.dingdong.domain.transportation.repository.PathQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.projection.PathSegmentProjection;
import com.ddbb.dingdong.infrastructure.bus.simulator.RouteSegment;
import com.ddbb.dingdong.infrastructure.bus.simulator.segment.RouteSegmentProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RepositoryRouteSegmentProvider implements RouteSegmentProvider {
    private final PathQueryRepository pathQueryRepository;

    @Override
    public List<RouteSegment> getRouteSegments(Long busId) {
        List<PathSegmentProjection> projections = pathQueryRepository.findSegmentByBusScheduleId(busId);
        return projections.stream()
                .collect(Collectors.groupingBy(PathSegmentProjection::getLineId, Collectors.toList()))
                .values()
                .stream()
                .map(pathSegmentProjections -> {
                    PathSegmentProjection head = pathSegmentProjections.get(0);
                    List<Point> points = pathSegmentProjections
                            .stream()
                            .map((item) -> new Point(item.getLongitude(), item.getLatitude()))
                            .toList();
                    return new RouteSegment(points, head.getMeter(), head.getSecond());
                })
                .toList();
    }
}
