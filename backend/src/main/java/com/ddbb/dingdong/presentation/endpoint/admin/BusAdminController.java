package com.ddbb.dingdong.presentation.endpoint.admin;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.bus.StartBusUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.presentation.endpoint.admin.exchanges.BusStartRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/bus")
public class BusAdminController {
    private final StartBusUseCase startBusUseCase;

    @PostMapping("/start")
    public ResponseEntity<Void> startBus(@RequestBody BusStartRequestDTO busStartRequestDTO) {
        try {
            startBusUseCase.execute(new StartBusUseCase.Param(
                    busStartRequestDTO.getBusScheduleId(),
                    busStartRequestDTO.getInterval(),
                    busStartRequestDTO.getDelay(),
                    busStartRequestDTO.getTimeUnit()
            ));
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().build();
    }
}
