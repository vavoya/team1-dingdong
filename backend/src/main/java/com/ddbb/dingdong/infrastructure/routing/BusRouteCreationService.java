package com.ddbb.dingdong.infrastructure.routing;

import com.ddbb.dingdong.infrastructure.routing.api.RouteOptimizationApiClient;
import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.infrastructure.routing.util.RouteOptimizationDTOConverter;
import com.ddbb.dingdong.domain.transportation.entity.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BusRouteCreationService {

    private static final double SNU_LATITUDE = 37.45988;
    private static final double SNU_LONGITUDE = 126.9519;
    private final RouteOptimizationApiClient apiClient;
    private final RouteOptimizationDTOConverter routeOptimizationDTOConverter;

    public Path routeOptimization(List<Location> locations) {
        Object request, response;

        request = generateRequests(locations);
        response = apiClient.getRouteOptimization(request);
        try {
            Path path = routeOptimizationDTOConverter.toPath(response);
            return path;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private Object generateRequests(List<Location> locations) {
        Object request;

        request = routeOptimizationDTOConverter.fromLocations(locations, SNU_LATITUDE, SNU_LONGITUDE);

        return request;
    }
}
