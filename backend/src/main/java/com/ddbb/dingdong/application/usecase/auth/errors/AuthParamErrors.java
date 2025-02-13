package com.ddbb.dingdong.application.usecase.auth.errors;

import com.ddbb.dingdong.application.exception.InvalidParamErrorInfo;

public enum AuthParamErrors implements InvalidParamErrorInfo {
    INVALID_USER_ID("유저 아이디가 올바르지 않습니다.", "userId"),
    INVALID_NAME("이름이 올바르지 않습니다.", "name"),
    USER_NOT_FOUND("해당 유저를 찾을 수 없습니다.", "email"),
    EMAIL_REQUIRED("이메일이 설정되지 않았습니다.", "email"),
    EMAIL_ALREADY_EXISTS("이미 존재하는 이메일입니다.", "email"),
    INVALID_EMAIL_FORMAT("이메일 형식이 올바르지 않습니다.", "email"),
    INVALID_PASSWORD_FORMAT("비밀번호는 8자 이상 20자 이하여야 하며, 대문자, 소문자, 특수문자를 포함해야 합니다.", "password"),
    NOT_MATCHED_PASSWORD("비밀번호가 일치하지 않습니다.", "password"),
    PASSWORD_REQUIRED("비밀번호가 설정되지 않았습니다.", "password"),
    INVALID_STATION_INFO("정류장 정보가 제대로 설정되지 않았습니다.", "home"),
    INVALID_HOME_LATITUDE("집 위도가 올바르지 않습니다.", "home.houseLatitude"),
    INVALID_HOME_LONGITUDE("집 경도가 올바르지 않습니다.", "home.houseLongitude"),
    INVALID_STATION_LATITUDE("정류장 위도가 올바르지 않습니다.", "home.stationLatitude"),
    INVALID_STATION_LONGITUDE("정류장 경도가 올바르지 않습니다.", "home.stationLongitude"),
    INVALID_STATION_NAME("정류장 이름이 올바르지 않습니다.", "home.stationName"),
    INVALID_SCHOOL_LATITUDE("학교 위도가 올바르지 않습니다.", "school.latitude"),
    INVALID_SCHOOL_LONGITUDE("학교 경도가 올바르지 않습니다.", "school.longitude"),
    INVALID_SCHOOL_NAME("학교 이름이 올바르지 않습니다.", "school.name"),
    INVALID_SCHOOL_ADDRESS("학교 주소가 올바르지 않습니다.", "school.roadNameAddress")
    ;

    private final String desc;
    private final String field;

    AuthParamErrors(String desc, String field) {
        this.desc = desc;
        this.field = field;
    }

    @Override
    public String getField() {
        return field;
    }

    @Override
    public String getDesc() {
        return desc;
    }

}
