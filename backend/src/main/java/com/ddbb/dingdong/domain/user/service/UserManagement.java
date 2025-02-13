package com.ddbb.dingdong.domain.user.service;

import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserManagement {
    private final UserRepository userRepository;

    public User load(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserErrors.NOT_FOUND::toException);
    }
}
