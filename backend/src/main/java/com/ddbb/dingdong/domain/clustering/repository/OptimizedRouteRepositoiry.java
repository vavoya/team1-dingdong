package com.ddbb.dingdong.domain.clustering.repository;

import com.ddbb.dingdong.domain.transportation.entity.Path;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptimizedRouteRepositoiry extends JpaRepository<Path, Long> {
}
