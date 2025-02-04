package com.ddbb.dingdong.application.exception;

import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public interface InvalidParamErrorInfo extends ErrorInfo {
    String getField();

    @Override
    default String getMessage() {
        return "[" + getCode() + "] " + getDesc() + " (" + getField() + ")";
    }

    @Override
    default InvalidParamException toException() {
        return new InvalidParamException(this);
    }
}
