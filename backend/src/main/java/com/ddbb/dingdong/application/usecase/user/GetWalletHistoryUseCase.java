package com.ddbb.dingdong.application.usecase.user;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.payment.entity.vo.DingdongMoneyUsageType;
import com.ddbb.dingdong.domain.payment.repository.WalletQueryRepository;
import com.ddbb.dingdong.domain.payment.repository.projection.UsageHistoryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetWalletHistoryUseCase implements UseCase<GetWalletHistoryUseCase.Param, GetWalletHistoryUseCase.Result> {
    private final WalletQueryRepository walletQueryRepository;

    @Transactional(readOnly = true)
    @Override
    public Result execute(Param param) {
        Long userId = param.userId;
        Pageable pageable = param.pageable;
        Page<UsageHistoryProjection> projections = walletQueryRepository.getUsageHistory(userId, pageable);
        List<Result.WalletHistory> result = projections.stream()
                .map(projection -> new Result.WalletHistory(
                        projection.getTimeStamp(),
                        projection.getType(),
                        projection.getAmountMoney(),
                        projection.getRemainMoney()))
                .toList();

        return new Result(new PagedModel<>(new PageImpl<>(result, pageable, projections.getTotalElements())));
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Pageable pageable;
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        private PagedModel<WalletHistory> histories;

        @Getter
        @AllArgsConstructor
        public static class WalletHistory {
            private LocalDateTime timeStamp;
            private DingdongMoneyUsageType type;
            private int amountMoney;
            private int remainMoney;
        }
    }
}
