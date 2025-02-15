package com.ddbb.dingdong.application.usecase.reservation.error;

import com.ddbb.dingdong.application.exception.InvalidParamErrorInfo;

public enum ReservationInvalidParamErrors implements InvalidParamErrorInfo {
    DUPLICATED_DATES("중복된 예약시간이 입력되었습니다.","date"),
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
