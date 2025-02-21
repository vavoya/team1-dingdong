package com.ddbb.dingdong.presentation.endpoint.reservation.exchanges;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class GeneralReservationConfirmDTO {
    private String token;
    private String direction;
    private List<GeneralReservationRequestDTO.ReservationInfo> dates;

    @Getter
    @NoArgsConstructor
    public static class ReservationInfo {
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        private LocalDateTime date;
    }
}
