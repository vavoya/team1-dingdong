package com.ddbb.dingdong.presentation.endpoint.bus;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.bus.GetAvailableBusLine;
import com.ddbb.dingdong.application.usecase.bus.GetBusSchedulesUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.annotation.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;

@RestController
@RequestMapping("/api/bus")
@RequiredArgsConstructor
public class BusController {
    private final GetBusSchedulesUseCase getBusSchedulesUseCase;
    private final GetAvailableBusLine getAvailableBusLine;

    @GetMapping("/schedule/time")
    public ResponseEntity<GetBusSchedulesUseCase.Response> getBusSchedules(
            @RequestParam("direction") Direction direction,
            @LoginUser AuthUser authUser
    ) {
        try {
            GetBusSchedulesUseCase.Param param = new GetBusSchedulesUseCase.Param(authUser.id(), direction);
            return ResponseEntity.ok(getBusSchedulesUseCase.execute(param));
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/available")
    public ResponseEntity<GetAvailableBusLine.Response> getBusSchedules(
            @LoginUser AuthUser authUser,
            @RequestParam("direction") Direction direction,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) @RequestParam("time") ZonedDateTime time
    ) {
        try {
            GetAvailableBusLine.Param param = new GetAvailableBusLine.Param(authUser.id(), time.toLocalDateTime(), direction);
            GetAvailableBusLine.Response result = getAvailableBusLine.execute(param);
            return ResponseEntity.ok(result);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }
}
