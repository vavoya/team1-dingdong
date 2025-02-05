package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.config.ClusteringConfig;
import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.model.Coordinate;
import com.ddbb.dingdong.domain.clustering.model.dto.RequestRouteOptimizationDTO;
import com.ddbb.dingdong.domain.clustering.model.dto.ResponseRouteOptimizationDTO;
import com.ddbb.dingdong.domain.clustering.util.CoordinateDeserializer;
import com.ddbb.dingdong.domain.clustering.util.HaversineDistanceFunction;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.ddbb.dingdong.domain.clustering.model.dto.RequestRouteOptimizationDTO.ViaPoint;

@Service
@Slf4j
public class BusRouteCreationService {

    private static final String TMAP_ROUTE_OPTIMIZATION_BASE_URL = "https://apis.openapi.sk.com/tmap/routes";
    private static final String TMAP_ROUTE_OPTIMIZATION_ENDPOINT = "/routeOptimization20";
    private static final double SNU_LATITUDE = 37.45988;
    private static final double SNU_LONGITUDE = 126.9519;
    private final WebClient webClient;
    private final ClusteringConfig clusteringConfig;

    @Autowired
    public BusRouteCreationService(WebClient.Builder webClientBuilder, ClusteringConfig clusteringConfig) {
        this.clusteringConfig = clusteringConfig;
        this.webClient = webClientBuilder
                .baseUrl(TMAP_ROUTE_OPTIMIZATION_BASE_URL)
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Accept", "application/json")
                .defaultHeader("appKey", clusteringConfig.getTmapKey())
                .build();
    }

    public List<ResponseRouteOptimizationDTO> routeOptimization20(List<Location> locations) {
        List<ResponseRouteOptimizationDTO> responses;
        List<RequestRouteOptimizationDTO> requests = new ArrayList<>();

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

            List<ViaPoint> viaPoints = new ArrayList<>();
            int id = 0;
            for (int j = start; j <= end; j++) {
                Location currentLocation = locations.get(j);
                viaPoints.add(
                        new ViaPoint(
                                Integer.toString(++id),
                                Double.toString(currentLocation.getLongitude()),
                                Double.toString(currentLocation.getLatitude())
                        )
                );
            }

            HaversineDistanceFunction haversine = HaversineDistanceFunction.getInstance();

            Optional<ViaPoint> farthestPoint = viaPoints.stream().max((o1, o2) -> {
                double[] point1 = {Double.parseDouble(o1.getViaY()), Double.parseDouble(o1.getViaX())};
                double[] point2 = {Double.parseDouble(o2.getViaY()), Double.parseDouble(o2.getViaX())};
                double[] endPoint = {SNU_LATITUDE, SNU_LONGITUDE};

                double point1Distance = haversine.d(point1, endPoint);
                double point2Distance = haversine.d(point2, endPoint);

                return Double.compare(point1Distance, point2Distance);
            });

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
            RequestRouteOptimizationDTO request = new RequestRouteOptimizationDTO(
                    farthestPoint.get().getViaX(),
                    farthestPoint.get().getViaY(),
                    formatter.format(LocalDateTime.now()),
                    Double.toString(SNU_LONGITUDE),
                    Double.toString(SNU_LATITUDE),
                    viaPoints.subList(1, Math.min(viaPoints.size(), 20))
            );
            requests.add(request);
        }

        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .registerTypeAdapter(new TypeToken<List<Coordinate>>() {}.getType(), new CoordinateDeserializer())
                .create();

        int clusterLabel = 0; // 테스트로 클러스터 1개만 돌리기 위한 임시 변수
        List<Mono<String>> stringResponses = requests.subList(clusterLabel, clusterLabel+1).stream()
                .map(request -> webClient.post()
                        .uri(uriBuilder -> uriBuilder
                                .path(TMAP_ROUTE_OPTIMIZATION_ENDPOINT)
                                .queryParam("version", "1")
                                .build()
                        )
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(String.class)
                )
                .toList();

        // 모든 Mono가 완료되면 List로 변환 후 반환
        responses = Flux.merge(stringResponses) // 병렬 실행
                .map(json -> gson.fromJson(json, ResponseRouteOptimizationDTO.class))
                .collectList()
                .timeout(Duration.ofSeconds(10))
                .onErrorResume(e -> {
                    System.err.println("Timeout occurred: " + e.getMessage());
                    return Mono.just(List.of()); // 빈 리스트 반환
                })
                .block();

        return responses;
    }
}
