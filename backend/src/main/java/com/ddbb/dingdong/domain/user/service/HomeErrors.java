package com.ddbb.dingdong.domain.user.service;

import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum HomeErrors implements ErrorInfo {
    REQUIRED_USER_ID("사용자 ID가 설정되지 않았습니다."),
    REQUIRED_HOUSE_LATITUDE("집의 위도가 설정되지 않았습니다."),
    REQUIRED_HOUSE_LONGITUDE("집의 경도가 설정되지 않았습니다."),
    REQUIRED_STATION_LATITUDE("역의 위도가 설정되지 않았습니다."),
    REQUIRED_STATION_LONGITUDE("역의 경도가 설정되지 않았습니다."),
    REQUIRED_STATION_NAME("역 이름이 설정되지 않았습니다."),
    INVALID_STATION_LATITUDE_RANGE("위도 값은 -90.0 ~ 90.0 사이여야 합니다."),
    INVALID_STATION_LONGITUDE_RANGE("경도 값은 -180.0 ~ 180.0 사이여야 합니다."),
    INVALID_HOME_LATITUDE_RANGE("위도 값은 -90.0 ~ 90.0 사이여야 합니다."),
    INVALID_HOME_LONGITUDE_RANGE("경도 값은 -180.0 ~ 180.0 사이여야 합니다.");

    private final String desc;

    HomeErrors(String desc) {
        this.desc = desc;
    }

    @Override
    public String getDesc() {
        return desc;
    }
}