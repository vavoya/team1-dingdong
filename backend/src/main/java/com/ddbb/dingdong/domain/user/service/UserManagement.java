package com.ddbb.dingdong.domain.user.service;

import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.UserRepository;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.AuthenticationManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserManagement {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public void login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(AuthError.NOT_FOUND::toException);
        if(!user.getPassword().equals(password)) throw AuthError.NOT_MATCHED_PASSWORD.toException();
        authenticationManager.setAuthentication(new AuthUser(user.getId()));
    }
}
