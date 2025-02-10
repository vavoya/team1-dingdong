package com.ddbb.dingdong.domain.transportation.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import lombok.Getter;
import org.springframework.stereotype.Service;

import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.transportation.repository.BusStopQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.projection.AvailableBusStopProjection;
import com.ddbb.dingdong.util.GeoUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusStopQueryService {
    private static final int THRESHOLD_METER = 1000;

    public record AvailableBusStopDistance(AvailableBusStopProjection busStop, double distance)
            implements Comparable<AvailableBusStopDistance> {
        @Override
        public int compareTo(AvailableBusStopDistance o) {
            return Double.compare(this.distance, o.distance);
        }
    }

    private final BusStopQueryRepository busStopQueryRepository;

    public List<AvailableBusStopProjection> findAvailableBusStops(
            Long schoolId, Direction direction, LocalDateTime time, Double longitude, Double latitude
    ) {
        List<AvailableBusStopProjection> projections = switch (direction) {
            case TO_HOME -> busStopQueryRepository.findAvailableGoHomeBusStop(time, schoolId);
            case TO_SCHOOL -> busStopQueryRepository.findAvailableGoSchoolBusStop(time, schoolId);
        };
        return projections.stream()
            .map(projection -> {
                double distance = GeoUtil.haversine(latitude, longitude, projection.getLatitude(), projection.getLongitude());
                return new AvailableBusStopDistance(projection, distance);
            })
            .filter(item -> item.distance() <= THRESHOLD_METER)
            .sorted(Comparator.comparingDouble(AvailableBusStopDistance::distance))
            .map(AvailableBusStopDistance::busStop)
            .toList();
    }
}
