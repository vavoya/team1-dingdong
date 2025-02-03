package com.ddbb.dingdong.domain.clustering.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class RequestRouteOptimizationDTO {
    private String reqCoordType = "WGS84GEO";
    private String resCoordType = "WGS84GEO";
    private String startName = "출발지";
    private final String startX;
    private final String startY;
    private final String startTime;
    private String endName = "서울대학교";
    private final String endX;
    private final String endY;
    private String endPoiId;
    private String searchOption;
    private String carType = "3";
    private String truckType = "6";
    private String truckWidth = "208";
    private String truckHeight = "280";
    private String truckWeight = "4074";
    private String truckTotalWeight = "5200";
    private String truckLength = "707";
    private final List<ViaPoint> viaPoints;

    @Data
    @RequiredArgsConstructor
    public static class ViaPoint {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private String viaPointId;
        private String viaPointName = "test";
        private String viaDetailAddress;
        private final String viaX;
        private final String viaY;
        private String viaPoiId;
        private Long viaTime;
        private String wishStartTime;
        private String wishEndTime;
    }
}


