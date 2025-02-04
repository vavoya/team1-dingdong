package com.ddbb.dingdong.application.exception;

import com.ddbb.dingdong.domain.common.exception.DomainException;

public class InvalidParamException extends DomainException {
    public InvalidParamErrorInfo error;

    public InvalidParamException(InvalidParamErrorInfo error) {
        super(error);
    }
}
