package com.ddbb.dingdong.domain.auth.service;

import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum AuthErrors implements ErrorInfo {
    INVALID_NAME("이름이 올바르지 않습니다."),
    SESSION_NOT_EXISTS("이미 만료되었거나 존재하지 않는 세션입니다."),
    USER_NOT_FOUND("해당 유저를 찾을 수 없습니다"),
    EMAIL_REQUIRED("이메일이 설정되지 않았습니다."),
    EMAIL_ALREADY_EXISTS("이미 존재하는 이메일입니다."),
    INVALID_EMAIL_FORMAT("이메일 형식이 올바르지 않습니다."),
    INVALID_PASSWORD_FORMAT("비밀번호는 8자 이상 20자 이하여야 하며, 대문자, 소문자, 특수문자를 포함해야 합니다."),
    NOT_MATCHED_PASSWORD("패스워드가 일치하지 않습니다"),
    PASSWORD_REQUIRED("비밀번호가 설정되지 않았습니다."),
    INVALID_STATION_INFO("정류장 정보가 제대로 설정되지 않았습니다."),
    INVALID_HOME_LATITUDE("집 위도가 올바르지 않습니다."),
    INVALID_HOME_LONGITUDE("집 경도가 올바르지 않습니다."),
    INVALID_STATION_LATITUDE("정류장 위도가 올바르지 않습니다."),
    INVALID_STATION_LONGITUDE("정류장 경도가 올바르지 않습니다."),
    INVALID_STATION_NAME("정류장 이름이 올바르지 않습니다."),
    INVALID_SCHOOL_LATITUDE("학교 위도가 올바르지 않습니다."),
    INVALID_SCHOOL_LONGITUDE("학교 경도가 올바르지 않습니다."),
    INVALID_SCHOOL_NAME("학교 이름이 올바르지 않습니다."),
    INVALID_SCHOOL_ADDRESS("학교 주소가 올바르지 않습니다.")
    ;

    private final String desc;

    AuthErrors(String desc) {
        this.desc = desc;
    }

    @Override
    public String getDesc() {
        return desc;
    }
}
