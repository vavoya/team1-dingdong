package com.ddbb.dingdong.presentation.endpoint.admin.exchanges;

import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
public class GetLocationRequestDTO {
    private Direction direction;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime dingdongTime;
}
