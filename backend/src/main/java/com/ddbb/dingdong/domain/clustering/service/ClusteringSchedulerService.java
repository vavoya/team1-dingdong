package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.model.dto.ResponseRouteOptimizationDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
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
        List<ResponseRouteOptimizationDTO> results = busRouteCreationService.routeOptimization20(locations);
        if (Objects.isNull(results) || results.isEmpty()) {
            log.error("Clustering scheduler error, no results found");
        }
        FileOutputStream fos = new FileOutputStream("src/main/resources/static/test.json");
        results.forEach(responseRouteOptimizationDTO -> {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(responseRouteOptimizationDTO);
            try {
                fos.write(json.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        log.info("Clustering scheduler end");
        Objects.requireNonNull(results).forEach(System.out::println);
    }
}
