package com.ddbb.dingdong.domain.transportation.service;


import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum BusErrors implements ErrorInfo {
    NO_SOCKET_CONNECTION("연결된 소켓이 없습니다."),
    BUS_UPDATE_ERROR("정류장 도착 예정 시간 업데이트 도중 오류가 발생했습니다."),
    NO_BUS_FOUND("조건에 만족하는 버스가 존재하지 않습니다."),
    NO_SEATS("남은 좌석이 없습니다."),
    BUS_SCHEDULE_UPDATE_ERR("버스 운행 상태 업데이트 도중 오류가 발생했습니다.")
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
