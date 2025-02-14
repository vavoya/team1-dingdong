package com.ddbb.dingdong.presentation.endpoint.admin.temp.dto;

import lombok.Getter;

@Getter
public class UserHomeUpdateDTO {
    private Long userId;
    private Double stationLatitude;
    private Double stationLongitude;
    private String stationName;
    private String stationRoadAddressName;
}
