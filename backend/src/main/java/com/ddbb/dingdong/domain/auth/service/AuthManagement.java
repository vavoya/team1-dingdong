package com.ddbb.dingdong.domain.auth.service;

import com.ddbb.dingdong.domain.user.repository.SchoolRepository;
import com.ddbb.dingdong.util.ParamValidator;
import com.ddbb.dingdong.domain.payment.entity.Wallet;
import com.ddbb.dingdong.domain.payment.repository.WalletRepository;
import com.ddbb.dingdong.domain.user.entity.Home;
import com.ddbb.dingdong.domain.user.entity.School;
import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.UserRepository;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.AuthenticationManager;
import com.ddbb.dingdong.infrastructure.auth.encrypt.PasswordEncoder;
import com.ddbb.dingdong.presentation.endpoint.auth.exchanges.SignUpRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class AuthManagement {
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final SchoolRepository schoolRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    private static final int BALANCE = 50000;

    @Transactional
    public void signUp(String name, String email, String password, SignUpRequestDto.Home home, Long schoolId) {
        School school = schoolRepository.findById(schoolId).orElseThrow(AuthErrors.SCHOOL_NOT_FOUND::toException);
        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .home(new Home(
                        null,
                        home.getHouseLatitude(),
                        home.getHouseLongitude(),
                        home.getHouseLatitude(),
                        home.getHouseLongitude(),
                        "우리집",
                        home.getHouseRoadNameAddress()
                ))
                .createdAt(LocalDateTime.now())
                .school(school)
                .build();
        user = userRepository.save(user);
        Wallet wallet = new Wallet(null, user.getId(), BALANCE, LocalDateTime.now(), new ArrayList<>());
        walletRepository.save(wallet);
    }

    public void login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(AuthErrors.USER_NOT_FOUND::toException);
        if(!passwordEncoder.matches(password, user.getPassword())) throw AuthErrors.NOT_MATCHED_PASSWORD.toException();
        authenticationManager.setAuthentication(new AuthUser(user.getId(), user.getSchool().getId()));
    }

    public void logout(Long userId) {
        userRepository.findById(userId).orElseThrow(AuthErrors.USER_NOT_FOUND::toException);
        try {
            authenticationManager.removeAuthentication();
        } catch (IllegalStateException e) {
            throw AuthErrors.SESSION_NOT_EXISTS.toException();
        }
    }

    public void checkEmail(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw AuthErrors.EMAIL_ALREADY_EXISTS.toException();
        }
    }

    public void checkPassword(String password) {
        if (!ParamValidator.isValidPassword(password)) {
            throw AuthErrors.INVALID_PASSWORD_FORMAT.toException();
        }
    }
}
