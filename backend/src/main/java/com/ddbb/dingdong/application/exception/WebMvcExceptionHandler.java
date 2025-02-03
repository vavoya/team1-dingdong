package com.ddbb.dingdong.application.exception;

import com.ddbb.dingdong.domain.common.exception.DomainException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@RestControllerAdvice
public class WebMvcExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(APIException.class)
    public ResponseEntity<?> handleAPIException(APIException ex) {
        ErrorResponse response = new ErrorResponse(ex.status, ex.error.getDesc(), ex.error.getCode(), LocalDateTime.now());

        return ResponseEntity.status(response.status)
                .body(response);
    }

    @ExceptionHandler(DomainException.class)
    public ResponseEntity<?> handleDomainException(DomainException ex) {
        ErrorResponse response = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.error.getDesc(), ex.error.getCode(), LocalDateTime.now());

        return ResponseEntity.status(response.status)
                .body(response);
    }


    record ErrorResponse(HttpStatus status, String desc, String code, LocalDateTime timestamp) {}
}
