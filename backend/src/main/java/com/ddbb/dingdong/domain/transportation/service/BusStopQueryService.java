package com.ddbb.dingdong.domain.transportation.service;

import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.transportation.repository.BusStopQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.projection.AvailableBusStopProjection;
import com.ddbb.dingdong.util.GeoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusStopQueryService {
    private static final int THRESHOLD_METER = 1000;

    private final BusStopQueryRepository busStopQueryRepository;

    public List<AvailableBusStopProjection> findAvailableBusStops(
            Long schoolId, Direction direction, LocalDateTime time, Double longitude, Double latitude
    ) {
        List<AvailableBusStopProjection> projections = switch (direction) {
            case TO_HOME -> busStopQueryRepository.findAvailableGoHomeBusStop(time, schoolId);
            case TO_SCHOOL -> busStopQueryRepository.findAvailableGoSchoolBusStop(time, schoolId);
        };
        Map<Long, List<AvailableBusStopProjection>> grouped = projections.stream()
                .collect(Collectors.groupingBy(AvailableBusStopProjection::getPathId, Collectors.toList()
        ));

        List<AvailableBusStopProjection> result = new ArrayList<>();
        for (List<AvailableBusStopProjection> group : grouped.values()) {
            if (group.isEmpty()) continue;

            AvailableBusStopProjection minItem = group.get(0);
            double minDistance = GeoUtil.haversine(latitude, longitude, minItem.getLatitude(), minItem.getLongitude());
            int itemCount = group.size();
            for (int i = 1; i < itemCount; i++) {
                AvailableBusStopProjection item = group.get(i);

                double currentDistance = GeoUtil.haversine(latitude, longitude, item.getLatitude(), item.getLongitude());
                if (currentDistance < minDistance) {
                    minDistance = currentDistance;
                    minItem = item;
                }
            }
            if (minDistance > THRESHOLD_METER) {
                continue;
            }
            result.add(minItem);
        }
        return result;
    }
}
