package com.ddbb.dingdong.application.usecase.user;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.payment.repository.WalletRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckFreeChargeAvailableUseCase implements UseCase<CheckFreeChargeAvailableUseCase.Param, CheckFreeChargeAvailableUseCase.Result> {
    private final WalletRepository walletRepository;

    @Override
    public Result execute(Param param) {
        return checkFreeChargeAvailable(param);
    }

    private Result checkFreeChargeAvailable(Param param) {
        Long userId = param.getUserId();
        return new Result(!walletRepository.existsFreeChargeTodayByUserId(userId));
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        private boolean isAvailable;
    }
}
