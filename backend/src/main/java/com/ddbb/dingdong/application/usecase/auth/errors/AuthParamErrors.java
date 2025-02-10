package com.ddbb.dingdong.application.usecase.auth.errors;

import com.ddbb.dingdong.application.exception.InvalidParamErrorInfo;

public enum AuthParamErrors implements InvalidParamErrorInfo {
    NOT_MATCHED_PASSWORD("패스워드가 일치하지 않습니다.", "password"),
    PASSWORD_REQUIRED("비밀번호가 설정되지 않았습니다.", "password"),
    USER_NOT_FOUND("해당 유저를 찾을 수 없습니다.", "email"),
    EMAIL_REQUIRED("이메일이 설정되지 않았습니다.", "email"),
    EMAIL_ALREADY_EXISTS("이미 존재하는 이메일입니다.", "email"),
    INVALID_EMAIL_FORMAT("이메일 형식이 올바르지 않습니다.", "email"),
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
