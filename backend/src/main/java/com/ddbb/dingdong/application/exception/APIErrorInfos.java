package com.ddbb.dingdong.application.exception;

import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum APIErrorInfos implements ErrorInfo {
    UNKNOWN("알 수 없는 에러입니다."),
    ;

    private final String desc;

    APIErrorInfos(String desc) {
        this.desc = desc;
    }

    @Override
    public String getDesc() {
        return desc;
    }
}
