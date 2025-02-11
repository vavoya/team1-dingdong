package com.ddbb.dingdong.application.usecase.user.error;

import com.ddbb.dingdong.application.exception.InvalidParamErrorInfo;

public enum HomeInvalidParamErrors implements InvalidParamErrorInfo {
    REQUIRED_USER_ID("사용자 ID가 설정되지 않았습니다.", "userId"),
    REQUIRED_HOUSE_LATITUDE("집의 위도가 설정되지 않았습니다.", "houseLatitude"),
    REQUIRED_HOUSE_LONGITUDE("집의 경도가 설정되지 않았습니다.", "houseLongitude"),
    REQUIRED_STATION_LATITUDE("역의 위도가 설정되지 않았습니다.", "stationLatitude"),
    REQUIRED_STATION_LONGITUDE("역의 경도가 설정되지 않았습니다.", "stationLongitude"),
    REQUIRED_STATION_NAME("역 이름이 설정되지 않았습니다.", "stationName"),
    INVALID_STATION_LATITUDE_RANGE("위도 값은 -90.0 ~ 90.0 사이여야 합니다.", "stationLatitude"),
    INVALID_STATION_LONGITUDE_RANGE("경도 값은 -180.0 ~ 180.0 사이여야 합니다.", "stationLongitude"),
    INVALID_HOME_LATITUDE_RANGE("위도 값은 -90.0 ~ 90.0 사이여야 합니다.", "houseLatitude"),
    INVALID_HOME_LONGITUDE_RANGE("경도 값은 -180.0 ~ 180.0 사이여야 합니다.", "houseLongitude");

    private final String desc;
    private final String field;

    HomeInvalidParamErrors(String desc, String field) {
        this.desc = desc;
        this.field = field;
    }

    @Override
    public String getDesc() {
        return desc;
    }

    @Override
    public String getField() {
        return field;
    }
}