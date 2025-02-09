package com.ddbb.dingdong.domain.user.repository;

import com.ddbb.dingdong.domain.user.entity.Home;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HomeRepository extends JpaRepository<Home, Long> {
    Optional<Home> findByUserId(Long userId);
}
