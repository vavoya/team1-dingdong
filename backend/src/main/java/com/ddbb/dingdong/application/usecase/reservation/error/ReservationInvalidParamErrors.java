package com.ddbb.dingdong.application.usecase.reservation.error;

import com.ddbb.dingdong.application.exception.InvalidParamErrorInfo;

public enum ReservationInvalidParamErrors implements InvalidParamErrorInfo {
    DUPLICATED_DATES("중복된 예약시간이 입력되었습니다.","date"),
    INVALID_BUS_STOP_ID("버스 정류장 ID가 유효하지 않습니다.", "busStopId"),
    INVALID_BUS_SCHEDULE_ID("버스 스케쥴 ID가 유효하지 않습니다.", "busScheduleId"),
    ;

    private final String desc;
    private final String field;

    ReservationInvalidParamErrors(String desc, String field) {
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
