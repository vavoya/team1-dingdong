package com.ddbb.dingdong.domain.auth.service;

import com.ddbb.dingdong.application.usecase.auth.util.SignUpFieldValidator;
import com.ddbb.dingdong.domain.user.entity.Home;
import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.UserRepository;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.AuthenticationManager;
import com.ddbb.dingdong.infrastructure.auth.encrypt.PasswordEncoder;
import com.ddbb.dingdong.presentation.endpoint.auth.dto.SignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthManagement {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public void signUp(String name, String email, String password, SignUpRequestDto.Home home) {
        checkEmail(email);
        checkPassword(password);
        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .home(new Home(
                        null,
                        home.getHouseLatitude(),
                        home.getHouseLongitude(),
                        home.getStationLatitude(),
                        home.getStationLongitude(),
                        home.getStationName()
                ))
                .build();
        userRepository.save(user);
    }

    public void login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(AuthErrors.USER_NOT_FOUND::toException);
        if(!passwordEncoder.matches(password, user.getPassword())) throw AuthErrors.NOT_MATCHED_PASSWORD.toException();
        authenticationManager.setAuthentication(new AuthUser(user.getId()));
    }

    public void checkEmail(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw AuthErrors.EMAIL_ALREADY_EXISTS.toException();
        }
    }

    public void checkPassword(String password) {
        if (!SignUpFieldValidator.isValidPassword(password)) {
            throw AuthErrors.INVALID_PASSWORD_FORMAT.toException();
        }
    }
}
