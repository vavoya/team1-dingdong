package com.ddbb.dingdong.presentation.endpoint.reservation.exchanges;

import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class GeneralReservationRequestDTO {
    private Direction direction;
    private List<ReservationInfo> dates;

    @Getter
    @NoArgsConstructor
    public static class ReservationInfo {
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        private LocalDateTime date;
    }
}
