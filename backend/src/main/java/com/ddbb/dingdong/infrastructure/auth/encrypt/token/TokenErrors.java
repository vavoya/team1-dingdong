package com.ddbb.dingdong.infrastructure.auth.encrypt.token;

import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum TokenErrors implements ErrorInfo {
    FAILED_TO_GENERATE("토큰 생성에 실패하였습니다"),
    INCORRECT_SIGNATURE("토큰 서명이 일치하지 않습니다."),
    EXPIRED("토큰 유효기간이 만료되었습니다."),
    INVALID("토큰 형식이 올바르지 않습니다."),
    ALREADY_USED("이미 사용된 토큰입니다"),
    ;

    private final String desc;

    TokenErrors(String desc) {
        this.desc = desc;
    }
    @Override
    public String getDesc() {
        return desc;
    }
}
