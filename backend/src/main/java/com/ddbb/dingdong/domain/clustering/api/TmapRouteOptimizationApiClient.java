package com.ddbb.dingdong.domain.clustering.api;

import com.ddbb.dingdong.domain.clustering.model.Coordinate;
import com.ddbb.dingdong.domain.clustering.model.dto.RequestRouteOptimizationDTO;
import com.ddbb.dingdong.domain.clustering.model.dto.ResponseRouteOptimizationDTO;
import com.ddbb.dingdong.domain.clustering.util.CoordinateDeserializer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;

@Component
@Primary
@RequiredArgsConstructor
public class TmapRouteOptimizationApiClient
        implements RouteOptimizationApiClient<List<RequestRouteOptimizationDTO>, List<ResponseRouteOptimizationDTO>> {

    @Value("${api.tmap.base-url}")
    private String baseUrl = "";

    @Value("${api.tmap.endpoint.route-optimization-20}")
    private String routeOptimizationEndpoint;

    @Value("${api.tmap.api-key}")
    private String apiKey;

    private final WebClient.Builder webClientBuilder;
    private WebClient webClient;

    @PostConstruct
    public void init() {
        webClient = webClientBuilder
                .baseUrl(baseUrl)
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Accept", "application/json")
                .defaultHeader("appKey", apiKey)
                .build();
    }

    @Override
    public List<ResponseRouteOptimizationDTO> getRouteOptimization(List<RequestRouteOptimizationDTO> requests) {
        List<ResponseRouteOptimizationDTO> responses;

        int clusterLabel = 0; // 테스트로 클러스터 1개만 돌리기 위한 임시 변수
        List<Mono<String>> stringResponses = requests.subList(clusterLabel, clusterLabel + 1).stream()
                .map(request -> webClient.post()
                        .uri(uriBuilder -> uriBuilder
                                .path(routeOptimizationEndpoint)
                                .queryParam("version", "1")
                                .build()
                        )
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(String.class)
                )
                .toList();

        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .registerTypeAdapter(new TypeToken<List<Coordinate>>() {
                }.getType(), new CoordinateDeserializer())
                .create();

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
