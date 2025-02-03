package com.ddbb.dingdong.application.exception;

import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum APIErrorInfos implements ErrorInfo {
    UNKNOWN("알 수 없는 에러가 발생하였습니다"),
    ;

    private String desc;

    APIErrorInfos(String desc) {}

    @Override
    public String getDesc() {
        return "";
    }
}
