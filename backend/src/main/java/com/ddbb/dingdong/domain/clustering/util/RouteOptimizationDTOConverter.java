package com.ddbb.dingdong.domain.clustering.util;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.transportation.entity.Path;

import java.util.List;

public interface RouteOptimizationDTOConverter<T, R> {
    T fromLocations(List<Location> locations, Double endLatitude, Double endLongitude);
    Path toPath(R response);
}
