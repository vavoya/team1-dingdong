package com.ddbb.dingdong.domain.payment.service;

import com.ddbb.dingdong.domain.payment.repository.WalletProjectionRepository;
import com.ddbb.dingdong.domain.payment.repository.projection.FailedRefundProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
@RequiredArgsConstructor
public class RetryScheduler {
    private final WalletProjectionRepository walletProjectionRepository;
    private static final int THREAD_SIZE = 3;
    private final ExecutorService executorService = Executors.newFixedThreadPool(THREAD_SIZE);
    private final PaymentManagement paymentManagement;

    @Scheduled(fixedRate = 1800000, initialDelay = 10000)
    public void retryFailedRefund() {
        List<FailedRefundProjection> projections = walletProjectionRepository.queryAllFailedRefund();

        int batchSize = (int) Math.ceil((double) projections.size() / THREAD_SIZE);

        for (int i = 0; i < projections.size(); i += batchSize) {
            int end = Math.min(i + batchSize, projections.size());
            List<FailedRefundProjection> batch = projections.subList(i, end);

            executorService.submit(() -> {
                for (FailedRefundProjection projection : batch) {
                    paymentManagement.refund(projection.getUserId(), projection.getReservationId());
                }
            });
        }
    }
}
