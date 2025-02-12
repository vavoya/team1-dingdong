package com.ddbb.dingdong.application.usecase.reservation.error;

import com.ddbb.dingdong.application.exception.InvalidParamErrorInfo;

public enum ReservationInvalidParamErrors implements InvalidParamErrorInfo {
    INVALID_DIRECTION("운행 방향이 올바르게 지정 되지 않았습니다.", "direction"),
    INVALID_DATE("예약 시간의 형식이 올바르지 않습니다.","date"),
    INVALID_BUS_STOP("유효하지 않은 버스 정류장입니다.", "busStop"),
    INVALID_BUS_SCHEDULE("유효하지 않은 버스 배차입니다.", "busSchedule"),
    BUS_SCHEDULE_NOT_FOUND("해당 버스 배차가 존재하지 않습니다.", "busSchedule"),
    BUS_STOP_NOT_FOUND("해당 버스 정류장이 존재하지 않습니다.", "busStop"),
    INVALID_RESERVATION_STATUS("유효하지 않은 예매 상태입니다.", "reservationStatus"),
    NOT_SINGLE_RESERVATION_DATES("단일 예약일이 아닙니다.", "reservationDates"),
    EXCEEDED_RESERVATION_DATE("예약 가능한 날짜를 초과하였습니다.", "reservationDate"),
    ISSUE_NOT_ALLOWED("배차 완료인 상태에서만 티켓을 발급할 수 있습니다.", "reservationStatus"),
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
