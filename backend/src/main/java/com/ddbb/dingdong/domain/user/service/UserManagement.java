package com.ddbb.dingdong.domain.user.service;

import com.ddbb.dingdong.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserManagement {
    private final UserRepository userRepository;
}
