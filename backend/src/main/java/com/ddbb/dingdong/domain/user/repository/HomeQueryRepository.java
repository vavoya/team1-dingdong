package com.ddbb.dingdong.domain.user.repository;

import com.ddbb.dingdong.domain.user.entity.Home;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HomeQueryRepository extends JpaRepository<Home, Long> {
    @Modifying
    @Query("UPDATE Home h " +
            "SET h.houseLatitude = :houseLatitude, " +
            "h.houseLongitude = :houseLongitude, " +
            "h.stationLatitude = :stationLatitude, " +
            "h.stationLongitude = :stationLongitude, " +
            "h.stationName = :stationName " +
            "WHERE h.user.id = :userId " +
            "AND EXISTS (SELECT u FROM User u WHERE u.id = h.user.id)")
    int updateHomeLocationByUserId(
            @Param("userId") Long userId,
            @Param("houseLatitude") Double houseLatitude,
            @Param("houseLongitude") Double houseLongitude,
            @Param("stationLatitude") Double stationLatitude,
            @Param("stationLongitude") Double stationLongitude,
            @Param("stationName") String stationName
    );
}
