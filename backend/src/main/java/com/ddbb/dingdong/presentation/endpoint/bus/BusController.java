package com.ddbb.dingdong.presentation.endpoint.bus;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.bus.GetAvailableBusLine;
import com.ddbb.dingdong.application.usecase.bus.GetBusSchedulesUseCase;
import com.ddbb.dingdong.application.usecase.bus.GetBusStopLocationUseCase;
import com.ddbb.dingdong.application.usecase.bus.GetPathPointLine;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.annotation.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/bus")
@RequiredArgsConstructor
public class BusController {
    private final GetBusSchedulesUseCase getBusSchedulesUseCase;
    private final GetAvailableBusLine getAvailableBusLine;
    private final GetPathPointLine getPathPointLine;
    private final GetBusStopLocationUseCase getBusStopLocationUseCase;

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
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) @RequestParam("time") LocalDateTime time
    ) {
        try {
            GetAvailableBusLine.Param param = new GetAvailableBusLine.Param(authUser.id(), time, direction);
            GetAvailableBusLine.Response result = getAvailableBusLine.execute(param);
            return ResponseEntity.ok(result);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/path/{busScheduleId}")
    public ResponseEntity<GetPathPointLine.Response> getPathPointLine(
            @LoginUser AuthUser authUser,
            @PathVariable("busScheduleId") Long busScheduleId
    ) {
        try {
            GetPathPointLine.Param param = new GetPathPointLine.Param(busScheduleId);
            GetPathPointLine.Response result = getPathPointLine.execute(param);
            return ResponseEntity.ok(result);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/bus-stop/location/{busScheduleId}")
    public ResponseEntity<GetBusStopLocationUseCase.Response> getBusStopLocation(
            @LoginUser AuthUser authUser,
            @PathVariable("busScheduleId") Long busScheduleId
    ) {
        try {
            GetBusStopLocationUseCase.Param param = new GetBusStopLocationUseCase.Param(authUser.id(), busScheduleId);
            return ResponseEntity.ok(getBusStopLocationUseCase.execute(param));
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }
}
