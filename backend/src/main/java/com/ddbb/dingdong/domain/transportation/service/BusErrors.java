package com.ddbb.dingdong.domain.transportation.service;


import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum BusErrors implements ErrorInfo {
    NO_SOCKET_CONNECTION("연결된 소켓이 없습니다."),
    NO_SEATS("남은 좌석이 없습니다."),
    ;
    private final String desc;

    BusErrors(String desc) {
        this.desc = desc;
    }

    @Override
    public String getDesc() {
        return desc;
    }

    @Override
    public String getMessage() {
        return ErrorInfo.super.getMessage();
    }

    @Override
    public String getCode() {
        return ErrorInfo.super.getCode();
    }

    @Override
    public DomainException toException() {
        return ErrorInfo.super.toException();
    }
}
