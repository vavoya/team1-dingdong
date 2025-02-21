package com.ddbb.dingdong.application.usecase.notification;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.notification.service.NotificationManagement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CheckUnreadNotificationUseCase implements UseCase<CheckUnreadNotificationUseCase.Param, CheckUnreadNotificationUseCase.Result> {
    private final NotificationManagement notificationManagement;

    @Transactional
    @Override
    public Result execute(Param param) {
        Long userId = param.getUserId();
        boolean hasUnreadNotifications = notificationManagement.hasUnreadNotifications(userId);

        return new Result(hasUnreadNotifications);
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        boolean hasUnreadNotifications;
    }
}
