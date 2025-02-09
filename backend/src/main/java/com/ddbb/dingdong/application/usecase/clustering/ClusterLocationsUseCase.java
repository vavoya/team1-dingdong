package com.ddbb.dingdong.application.usecase.clustering;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.service.ClusteringService;
import com.ddbb.dingdong.domain.clustering.service.error.ClusterErrors;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationType;
import com.ddbb.dingdong.domain.reservation.repository.ReservationQueryRepository;
import com.ddbb.dingdong.domain.reservation.repository.ReservationRepository;
import com.ddbb.dingdong.domain.reservation.repository.projection.UserReservationLocationProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClusterLocationsUseCase implements UseCase<ClusterLocationsUseCase.Param, Void> {
    private final ClusteringService clusteringService;
    private final ReservationQueryRepository reservationQueryRepository;

    @Transactional
    @Override
    public Void execute(Param param) {
        List<Location> allLocations = getAllLocations(param);
        cluster(allLocations);
        return null;
    }

    private void cluster(List<Location> allLocations) {
        if(allLocations.isEmpty()) throw ClusterErrors.EMPTY_RESERVATIONS.toException();
        try {
            clusteringService.cluster(allLocations);
        } catch (Exception e) {
            throw ClusterErrors.UNKNOWN.toException();
        }
    }

    private List<Location> getAllLocations(Param param) {

        int direction = switch (param.getDirection()) {
            case TO_SCHOOL -> 0;
            case TO_HOME -> 1;
        };

        LocalDateTime dingdongTime = param.getDingdongTime();

        List<UserReservationLocationProjection> projections = reservationQueryRepository.findUsersAndLocationsAndReservations(direction, dingdongTime);

        return projections.stream()
                .map(projection -> {
                    Location location = new Location();
                    location.setReservationId(projection.getReservationId());
                    location.setLatitude(projection.getUserLat());
                    location.setLongitude(projection.getUserLon());
                    return location;
                }).toList();
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Direction direction;
        private LocalDateTime dingdongTime;
    }
}
