package com.ddbb.dingdong;

import com.ddbb.dingdong.domain.payment.entity.Wallet;
import com.ddbb.dingdong.domain.payment.repository.WalletRepository;
import com.ddbb.dingdong.domain.user.entity.Home;
import com.ddbb.dingdong.domain.user.entity.School;
import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.SchoolRepository;
import com.ddbb.dingdong.domain.user.repository.UserRepository;
import com.ddbb.dingdong.infrastructure.auth.encrypt.PasswordEncoder;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApplicationInitializer {
    private final SchoolRepository schoolRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final WalletRepository walletRepository;

    @PostConstruct
    public void init() {
        if (userRepository.findByEmail("test@test.com").isEmpty()) {
            String password = passwordEncoder.encode("abcd1234!@");
            School school = new School(null, "서울대학교", "서울대학교", 37.4602, 126.9527);
            school = schoolRepository.save(school);

            for (int i = 0 ; i < 30; i++) {
                autoSignUp(i, password, school);
            }
        }
    }

    private void autoSignUp(int testId, String password, School school) {
        Home home = new Home(null, 37.5143, 127.0294, 37.513716, 127.029790, "에티버스" ,"학동로 180");
        String email = testId == 0 ? "test@test.com" : "test" +testId + "@test.com";
        User user = new User(null, "test", email, password, LocalDateTime.now(), school, null);
        user.associateHome(home);
        user = userRepository.save(user);
        Wallet wallet = new Wallet(null, user.getId(), 50000, LocalDateTime.now(), new ArrayList<>());
        walletRepository.save(wallet);
    }
}
