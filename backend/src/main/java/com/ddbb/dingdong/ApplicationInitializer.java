package com.ddbb.dingdong;

import com.ddbb.dingdong.domain.reservation.entity.Reservation;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationStatus;
import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationType;
import com.ddbb.dingdong.domain.reservation.repository.ReservationRepository;
import com.ddbb.dingdong.domain.user.entity.Home;
import com.ddbb.dingdong.domain.user.entity.School;
import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.UserRepository;
import com.ddbb.dingdong.infrastructure.auth.encrypt.PasswordEncoder;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApplicationInitializer {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReservationRepository reservationRepository;

    @Transactional
    @PostConstruct
    public void init() {

        School school = new School();
        school.setId(1L);
        if (userRepository.findByEmail("test@test.com").isEmpty()) {
            String password = passwordEncoder.encode("abcd1234!@");
            Home home = new Home(null, 37.5143, 127.0294, 37.513716, 127.029790,"에티버스");
            User user = new User(null, "test", "test@test.com", password, LocalDateTime.now(), school, home);
            userRepository.save(user);
        }

        if (userRepository.findByEmail("test2@test.com").isEmpty()) {
            String password = passwordEncoder.encode("abcd1234!@");
            Home home = new Home(null, 37.5143, 127.0294, 37.516716, 127.032790,"에티버스");
            User user = new User(null, "test", "test2@test.com", password, LocalDateTime.now(), school, home);
            userRepository.save(user);
        }

        if (userRepository.findByEmail("test3@test.com").isEmpty()) {
            String password = passwordEncoder.encode("abcd1234!@");
            Home home = new Home(null, 37.5143, 127.0294, 37.511716, 127.022790,"에티버스");
            User user = new User(null, "test", "test3@test.com", password, LocalDateTime.now(), school, home);
            userRepository.save(user);
        }

        if (userRepository.findByEmail("tes4t@test.com").isEmpty()) {
            String password = passwordEncoder.encode("abcd1234!@");
            Home home = new Home(null, 37.5143, 127.0294, 37.515716, 127.031790,"에티버스");
            User user = new User(null, "test", "test4@test.com", password, LocalDateTime.now(), school, home);
            userRepository.save(user);
        }
        for(long l = 1L ; l <= 4L ; l++) {
            Reservation reservation = new Reservation();
            reservation.setUserId(l);
            reservation.setType(ReservationType.GENERAL);
            reservation.setDirection(Direction.TO_SCHOOL);
            reservation.setStartDate(LocalDate.of(2025, 2, 11));
            reservation.setArrivalTime(LocalDateTime.of(2025, 2, 11, 13, 0, 0));
            reservation.setStatus(ReservationStatus.PENDING);
            reservationRepository.save(reservation);
        }
    }

}
