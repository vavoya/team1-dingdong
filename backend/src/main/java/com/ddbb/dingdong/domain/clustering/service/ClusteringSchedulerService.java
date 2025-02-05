package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.transportation.entity.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class ClusteringSchedulerService {

    private final ElkiClusteringService elkiClusteringService;
    private final BusRouteCreationService busRouteCreationService;

    @Scheduled(cron = "0 0/30 9-17 * * SUN,MON,TUE,WED,SAT")
    public void scheduleClustering() throws FileNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        log.info("Clustering scheduler start, {}시 {}분", now.getHour(), now.getMinute());

        List<Location> locations = elkiClusteringService.elkiDBScan(3, 2);
        List<Path> results = busRouteCreationService.routeOptimization(locations);
        if (Objects.isNull(results) || results.isEmpty()) {
            log.error("Clustering scheduler error, no results found");
        }

        log.info("Clustering scheduler end");
        Objects.requireNonNull(results).forEach(System.out::println);
    }
}
