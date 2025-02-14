package com.ddbb.dingdong.domain.user.repository;

import com.ddbb.dingdong.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u " +
            "JOIN FETCH School school ON school.id = u.school.id " +
            "JOIN FETCH Home home ON home.id = u.home.id ")
    List<User> findAllUser();
}
