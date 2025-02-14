package com.ddbb.dingdong.presentation.endpoint.user.exchanges;

import lombok.Getter;

@Getter
public class UpdateHomeLocationDto {
    private String stationName;
    private String stationRoadAddressName;
    private Double latitude;
    private Double longitude;
}
