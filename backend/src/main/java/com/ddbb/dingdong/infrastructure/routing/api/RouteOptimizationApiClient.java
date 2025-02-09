package com.ddbb.dingdong.infrastructure.routing.api;

import org.springframework.stereotype.Component;

@Component
public interface RouteOptimizationApiClient<T, R> {
    R getRouteOptimization(T request);
}
