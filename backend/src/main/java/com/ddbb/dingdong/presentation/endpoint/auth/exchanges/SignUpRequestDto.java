package com.ddbb.dingdong.presentation.endpoint.auth.exchanges;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class SignUpRequestDto {
    private String name;
    private String email;
    private String password;
    private Home home;
    private Long schoolId;

    @Data
    @AllArgsConstructor
    public static class Home {
        private Double houseLatitude;
        private Double houseLongitude;
        private String houseRoadNameAddress;
    }
}