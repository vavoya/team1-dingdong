package com.ddbb.dingdong.domain.reservation.repository.projection;

public interface UserReservationLocationProjection {
    Long getReservationId();
    Double getUserLat();
    Double getUserLon();
}
