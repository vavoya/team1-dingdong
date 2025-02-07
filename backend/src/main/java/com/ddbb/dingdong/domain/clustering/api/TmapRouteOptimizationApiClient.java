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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@Primary
@RequiredArgsConstructor
@Slf4j
public class TmapRouteOptimizationApiClient
        implements RouteOptimizationApiClient<RequestRouteOptimizationDTO, ResponseRouteOptimizationDTO> {

    @Value("${api.tmap.base-url}")
    private String baseUrl = "";

    @Value("${api.tmap.endpoint.route-optimization-20}")
    private String routeOptimizationEndpoint;

    private HttpClient httpClient;

    private final TmapApiKeyManager tmapApiKeyManager;

    @PostConstruct
    public void init() {
        httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    @Override
    public ResponseRouteOptimizationDTO getRouteOptimization(RequestRouteOptimizationDTO request) {
        LocalDateTime start = LocalDateTime.now();
        log.info("Optimize Start: {}시 {}분 {}초", start.getHour(), start.getMinute(), start.getSecond());

        ResponseRouteOptimizationDTO response = fetchApi(request).orElse(null);

        LocalDateTime end = LocalDateTime.now();
        String status;
        if (response == null) {
            status = "FAILED";
        } else {
            status = "SUCCESS";
        }
        log.info("Optimize End: {}시 {}분 {}초, 소요 시간: {}초, 응답 성공 여부: {}", end.getHour(), end.getMinute(), end.getSecond(), end.getSecond()-start.getSecond(), status);
        return response;
    }

    private Optional<ResponseRouteOptimizationDTO> fetchApi(RequestRouteOptimizationDTO request) {
        Gson requestGson = new GsonBuilder().setPrettyPrinting().create();
        Gson responseGson = new GsonBuilder()
                .setPrettyPrinting()
                .registerTypeAdapter(new TypeToken<List<Coordinate>>() {
                }.getType(), new CoordinateDeserializer())
                .create();
        try {
            String apiKey = tmapApiKeyManager.getCurrentApiKey();

            // 요청은 최대 3번 실행
            for (int i = 0; i < 3; i++) {
                HttpRequest httpRequest = HttpRequest.newBuilder()
                        .uri(URI.create(baseUrl + routeOptimizationEndpoint))
                        .header("Content-Type", "application/json")
                        .header("Accept", "application/json")
                        .header("appKey", apiKey)
                        .POST(HttpRequest.BodyPublishers.ofString(requestGson.toJson(request)))
                        .build();

                HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    return Optional.ofNullable(responseGson.fromJson(response.body(), ResponseRouteOptimizationDTO.class));
                } else {
                    log.error("Error Status Code: {}, Error Message: {}", response.statusCode(), response.body());
                    tmapApiKeyManager.switchToNextApiKey();
                    apiKey = tmapApiKeyManager.getCurrentApiKey();
                }
            }

            return Optional.empty();

        } catch (IOException | InterruptedException e) {
            return Optional.empty();
        }
    };
}
