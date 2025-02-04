package com.ddbb.dingdong.domain.clustering.model.dto;

import com.ddbb.dingdong.domain.clustering.model.Coordinate;
import lombok.Data;

import java.io.IOException;
import java.util.List;

@Data
public class ResponseRouteOptimizationDTO {
    private List<Feature> features;
    private String type;
    private ResponseRouteOptimizationDTOProperties properties;
}

@Data
class Feature {
    private Geometry geometry;
    private FeatureType type;
    private FeatureProperties properties;
}

@Data
class Geometry {
    private GeometryType type;
    private List<Coordinate> coordinates;
}

enum GeometryType {
    LINE_STRING, POINT;

    public String toValue() {
        switch (this) {
            case LINE_STRING: return "LineString";
            case POINT: return "Point";
        }
        return null;
    }

    public static GeometryType forValue(String value) throws IOException {
        if (value.equals("LineString")) return LINE_STRING;
        if (value.equals("Point")) return POINT;
        throw new IOException("Cannot deserialize GeometryType");
    }
}

@Data
class FeatureProperties {
    private String arriveTime;
    private String distance;
    private String deliveryTime;
    private String viaPointId;
    private String index;
    private String completeTime;
    private String pointType;
    private String waitTime;
    private String viaPointName;
    private String viaDetailAddress;
    private String groupKey;
    private String fare;
    private String time;
    private String poiId;
}

enum FeatureType {
    FEATURE;

    public String toValue() {
        switch (this) {
            case FEATURE: return "Feature";
        }
        return null;
    }

    public static FeatureType forValue(String value) throws IOException {
        if (value.equals("Feature")) return FEATURE;
        throw new IOException("Cannot deserialize FeatureType");
    }
}

@Data
class ResponseRouteOptimizationDTOProperties {
    private String totalFare;
    private String totalTime;
    private String totalDistance;
}
