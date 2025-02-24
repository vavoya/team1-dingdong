package com.ddbb.dingdong.domain.reservation.repository;

import com.ddbb.dingdong.domain.transportation.entity.BusStop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusStopRepository extends JpaRepository<BusStop, Long> {
}
