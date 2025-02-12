package com.ddbb.dingdong.domain.notification.service.error;

import com.ddbb.dingdong.domain.common.exception.ErrorInfo;

public enum NotificationErrors implements ErrorInfo {
    ;

    private final String desc;

    NotificationErrors(String desc) {
        this.desc = desc;
    }

    @Override
    public String getDesc() {
        return desc;
    }
}
