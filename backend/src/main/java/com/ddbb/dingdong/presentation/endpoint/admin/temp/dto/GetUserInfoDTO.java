package com.ddbb.dingdong.presentation.endpoint.admin.temp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetUserInfoDTO {
    private List<Item> items;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Item {
        private Long userId;
        private Double houseLongitude;
        private Double houseLatitude;
        private Double stationLongitude;
        private Double stationLatitude;
        private String stationName;
        private String email;
    }
}
