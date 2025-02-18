package com.ddbb.dingdong.application.usecase.user;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.payment.service.PaymentManagement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChargeDingdongMoneyFreeUseCase implements UseCase<ChargeDingdongMoneyFreeUseCase.Param, Void> {
    private final PaymentManagement paymentManagement;

    @Transactional
    @Override
    public Void execute(Param param) {
        freeCharge(param);

        return null;
    }

    private void freeCharge(Param param) {
        Long userId = param.getUserId();
        paymentManagement.freeCharge(userId);
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        Long userId;
    }
}
