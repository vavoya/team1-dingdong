package com.ddbb.dingdong.domain.payment.service;

import com.ddbb.dingdong.domain.payment.entity.Wallet;
import com.ddbb.dingdong.domain.payment.event.WalletUpdatedEvent;
import com.ddbb.dingdong.domain.payment.event.PaymentType;
import com.ddbb.dingdong.domain.payment.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentManagement {
    private static final int PRICE = 1000;
    private final WalletRepository walletRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public void pay(Long userId, int quantity) {

        Wallet wallet = walletRepository.findWalletByUserIdForUpdate(userId)
                .orElseThrow(PaymentErrors.WALLET_NOT_FOUND::toException);
        Long walletId = wallet.getId();
        int totalPrice = quantity * PRICE;
        int remain = wallet.pay(totalPrice);
        LocalDateTime timeStamp = wallet.getLastUpdatedAt();
        walletRepository.save(wallet);

        eventPublisher.publishEvent(new WalletUpdatedEvent(walletId, PaymentType.PAY, totalPrice, remain, timeStamp));
    }
}
