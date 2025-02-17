package com.ddbb.dingdong.presentation.endpoint.auth.exchanges;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class SignUpRequestDto {
    private String name;
    private String email;
    private String password;
    private Home home;
    private Long schoolId;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Home {
        private Double houseLatitude;
        private Double houseLongitude;
        private String houseRoadNameAddress;
    }
}