package com.ddbb.dingdong.domain.clustering.api;

import org.springframework.stereotype.Component;

@Component
public interface RouteOptimizationApiClient<T, R> {
    R getRouteOptimization(T request);
}
