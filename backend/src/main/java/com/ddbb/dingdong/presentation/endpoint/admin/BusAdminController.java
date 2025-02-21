package com.ddbb.dingdong.presentation.endpoint.admin;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.bus.StartBusUseCase;
import com.ddbb.dingdong.application.usecase.bus.StopBusUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.presentation.endpoint.admin.exchanges.BusStartRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/bus")
public class BusAdminController {
    private final StartBusUseCase startBusUseCase;
    private final StopBusUseCase stopBusUseCase;

    @PostMapping("/{busScheduleId}")
    public ResponseEntity<Void> startBus(
            @PathVariable("busScheduleId") Long busScheduleId,
            @RequestBody BusStartRequestDTO busStartRequestDTO
    ) {
        try {
            startBusUseCase.execute(new StartBusUseCase.Param(
                    busScheduleId,
                    busStartRequestDTO.getInterval(),
                    busStartRequestDTO.getDelay(),
                    busStartRequestDTO.getTimeUnit()
            ));
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{busScheduleId}")
    public ResponseEntity<Void> stopBus(
            @PathVariable("busScheduleId") Long busScheduleId
    ) {
        try {
            StopBusUseCase.Param param = new StopBusUseCase.Param(busScheduleId);
            stopBusUseCase.execute(param);
            return ResponseEntity.ok().build();
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }
}
