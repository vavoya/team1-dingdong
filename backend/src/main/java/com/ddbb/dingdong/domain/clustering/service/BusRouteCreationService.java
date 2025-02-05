package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.api.RouteOptimizationApiClient;
import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.util.RouteOptimizationDTOConverter;
import com.ddbb.dingdong.domain.transportation.entity.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BusRouteCreationService {

    private static final double SNU_LATITUDE = 37.45988;
    private static final double SNU_LONGITUDE = 126.9519;
    private final RouteOptimizationApiClient apiClient;
    private final RouteOptimizationDTOConverter routeOptimizationDTOConverter;

    public List<Path> routeOptimization(List<Location> locations) throws FileNotFoundException {
        List responses;
        List requests = new ArrayList<>();

        Collections.sort(locations);

        for (int i = 0; i < locations.size(); i++) {
            int nowLabel = locations.get(i).getClusterLabel();
            if (nowLabel == -1) continue;
            int start = i;
            int end = i;
            for (int j = i + 1; j < locations.size(); j++) {
                int nextLabel = locations.get(j).getClusterLabel();
                if (nowLabel != nextLabel) break;
                end = j;
            }
            i = end;
            if (end - start >= 15) continue;

            requests.add(routeOptimizationDTOConverter.fromLocations(locations.subList(start, end+1), SNU_LATITUDE, SNU_LONGITUDE));
        }

        responses = (List) apiClient.getRouteOptimization(requests);

        List<Path> paths = routeOptimizationDTOConverter.toPaths(responses);

        return paths;
    }
}
