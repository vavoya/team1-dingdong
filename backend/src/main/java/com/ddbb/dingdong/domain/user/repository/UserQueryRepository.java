package com.ddbb.dingdong.domain.user.repository;

import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.projection.UserStaticOnly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserQueryRepository extends JpaRepository<User, Long> {
    @Query("SELECT u.name as userName, s.name as schoolName, u.email as email  FROM User u JOIN u.school s WHERE u.id = :id")
    Optional<UserStaticOnly> findUserStaticInfoById(Long id);
}
