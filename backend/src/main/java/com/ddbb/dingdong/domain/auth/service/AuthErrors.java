package com.ddbb.dingdong.domain.auth.service;

import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum AuthErrors implements ErrorInfo {
    NOT_MATCHED_PASSWORD("패스워드가 일치하지 않습니다"),
    PASSWORD_REQUIRED("비밀번호가 설정되지 않았습니다."),
    USER_NOT_FOUND("해당 유저를 찾을 수 없습니다"),
    EMAIL_REQUIRED("이메일이 설정되지 않았습니다."),
    EMAIL_ALREADY_EXISTS("이미 존재하는 이메일입니다."),
    INVALID_EMAIL_FORMAT("이메일 형식이 올바르지 않습니다."),
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
