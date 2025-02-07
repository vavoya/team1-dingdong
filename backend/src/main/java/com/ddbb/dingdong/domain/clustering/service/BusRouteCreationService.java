package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.api.RouteOptimizationApiClient;
import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.util.RouteOptimizationDTOConverter;
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
        Path path = routeOptimizationDTOConverter.toPath(response);

        return path;
    }

    private Object generateRequests(List<Location> locations) {
        Object request;

        request = routeOptimizationDTOConverter.fromLocations(locations, SNU_LATITUDE, SNU_LONGITUDE);

        return request;
    }
}
