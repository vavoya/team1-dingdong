package com.ddbb.dingdong.presentation.endpoint.auth.exchanges;

import lombok.Data;

@Data
public class SignUpRequestDto {
    private String name;
    private String email;
    private String password;
    private Home home;
    private School school;

    @Data
    public static class Home {
        private Double houseLatitude;
        private Double houseLongitude;
        private Double stationLatitude;
        private Double stationLongitude;
        private String stationName;
    }

    @Data
    public static class School {
        private String name;
        private String roadNameAddress;
        private Double latitude;
        private Double longitude;
    }
}