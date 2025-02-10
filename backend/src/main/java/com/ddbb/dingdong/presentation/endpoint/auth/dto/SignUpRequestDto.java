package com.ddbb.dingdong.presentation.endpoint.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class SignUpRequestDto {
    private String name;
    private String email;
    private String password;
    private Home home;

    @Data
    @AllArgsConstructor
    @RequiredArgsConstructor
    public static class Home {
        private final Double houseLatitude;
        private final Double houseLongitude;
        private Double stationLatitude;
        private Double stationLongitude;
        private String stationName;
    }
}