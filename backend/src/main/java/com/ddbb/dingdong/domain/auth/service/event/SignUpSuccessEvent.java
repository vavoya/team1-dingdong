package com.ddbb.dingdong.domain.auth.service.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpSuccessEvent {
    private Long userId;
}
