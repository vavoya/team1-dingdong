package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.model.RequestRouteOptimizationDTO;
import com.ddbb.dingdong.domain.clustering.model.ResponseRouteOptimizationDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.ddbb.dingdong.domain.clustering.model.RequestRouteOptimizationDTO.ViaPoint;

@Service
@Slf4j
public class BusRouteCreationService {

    private static final String TMAP_ROUTE_OPTIMIZATION_BASE_URL = "https://apis.openapi.sk.com/tmap/routes";
    private static final String TMAP_API_KEY = "nNA3xYEQxu9msU3roPCCX20tZ7RKsLGa1CoFwcq9";
    private static final String TMAP_ROUTE_OPTIMIZATION_ENDPOINT = "/routeOptimization20";
    private static final double SNU_LATITUDE = 37.45988;
    private static final double SNU_LONGITUDE = 126.9519;
    private final WebClient webClient;

    public BusRouteCreationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl(TMAP_ROUTE_OPTIMIZATION_BASE_URL)
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Accept", "application/json")
                .defaultHeader("appKey", TMAP_API_KEY)
                .build();
    }

    public Mono<List<ResponseRouteOptimizationDTO>> routeOptimization20(List<Location> locations) {
        List<Mono<ResponseRouteOptimizationDTO>> responses;
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
            if (end - start >= 20) continue;

            List<ViaPoint> viaPoints = new ArrayList<>();
            for (int j = start; j <= end; j++) {
                Location currentLocation = locations.get(j);
                viaPoints.add(
                        new ViaPoint(
                                Double.toString(currentLocation.getLongitude()),
                                Double.toString(currentLocation.getLatitude())
                        )
                );
            }
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
            RequestRouteOptimizationDTO request = new RequestRouteOptimizationDTO(
                    viaPoints.get(0).getViaX(),
                    viaPoints.get(0).getViaY(),
                    formatter.format(LocalDateTime.now()),
                    Double.toString(SNU_LONGITUDE),
                    Double.toString(SNU_LATITUDE),
                    viaPoints.subList(1, Math.min(viaPoints.size(), 20))
            );

            log.info(request.toString());

            requests.add(request);
        }

        responses = requests.stream()
                .map(request -> webClient.post()
                        .uri(uriBuilder -> uriBuilder
                                .path(TMAP_ROUTE_OPTIMIZATION_ENDPOINT)
                                .queryParam("version", "1")
                                .build()
                        )
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(ResponseRouteOptimizationDTO.class)
                )
                .toList();

        // 모든 Mono가 완료되면 List로 변환 후 반환
        return Flux.merge(responses) // 병렬 실행
                .collectList();  // 모든 응답을 List로 모음

    }
}
