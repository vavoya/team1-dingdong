package com.ddbb.dingdong.application.usecase.reservation;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.reservation.service.ReservationManagement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CancelReservationUseCase implements UseCase<CancelReservationUseCase.Param, Void> {
    private final ReservationManagement reservationManagement;

    @Transactional
    @Override
    public Void execute(Param param) {
        reservationManagement.cancel(param.getUserId(), param.getReservationId());

        return null;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        Long userId;
        Long reservationId;
    }
}
