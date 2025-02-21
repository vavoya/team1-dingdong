package com.ddbb.dingdong.presentation.endpoint.admin.temp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FastSignUpDTO {
    private String name;
    private String email;
    private String password;
    private Double stationLatitude;
    private Double stationLongitude;
    private String houseRoadNameAddress;
}
