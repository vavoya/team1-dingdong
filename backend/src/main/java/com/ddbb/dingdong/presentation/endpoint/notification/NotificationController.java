package com.ddbb.dingdong.presentation.endpoint.notification;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.notification.CheckUnreadNotificationUseCase;
import com.ddbb.dingdong.application.usecase.notification.GetNotificationsUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.infrastructure.auth.security.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.security.annotation.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/notifications")
public class NotificationController {
    private final GetNotificationsUseCase getNotificationsUseCase;
    private final CheckUnreadNotificationUseCase checkUnreadNotificationUseCase;

    @GetMapping
    public ResponseEntity<GetNotificationsUseCase.Result> getUserNotifications(
            @LoginUser AuthUser user,
            @RequestParam("page") int page,
            @RequestParam(value = "pageSize", defaultValue = "-1") int pageSize
    ) {
        Long userid = user.id();
        Pageable pageable = pageSize == -1 ? Pageable.unpaged() : PageRequest.of(page, pageSize);
        GetNotificationsUseCase.Param param = new GetNotificationsUseCase.Param(userid, pageable);
        GetNotificationsUseCase.Result result;
        try {
            result = getNotificationsUseCase.execute(param);
        } catch (DomainException ex) {
            throw new APIException(ex, HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/check-unread")
    public ResponseEntity<CheckUnreadNotificationUseCase.Result> getUserNotifications(
            @LoginUser AuthUser user
    ) {
        Long userid = user.id();
        CheckUnreadNotificationUseCase.Param param = new CheckUnreadNotificationUseCase.Param(userid);
        CheckUnreadNotificationUseCase.Result result;
        try {
            result = checkUnreadNotificationUseCase.execute(param);
        } catch (DomainException ex) {
            throw new APIException(ex, HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(result);
    }
}
