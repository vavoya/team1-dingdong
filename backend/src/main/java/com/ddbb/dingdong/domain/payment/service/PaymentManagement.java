package com.ddbb.dingdong.domain.payment.service;

import com.ddbb.dingdong.domain.payment.entity.Wallet;
import com.ddbb.dingdong.domain.payment.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentManagement {
    private static final int PRICE = 1000;
    private final WalletRepository walletRepository;

    @Transactional
    public void pay(Long userId, int quantity) {
        Wallet wallet = walletRepository.findWalletByUserIdForUpdate(userId)
                .orElseThrow(PaymentErrors.WALLET_NOT_FOUND::toException);
        int totalPrice = quantity * PRICE;
        wallet.pay(totalPrice);

        walletRepository.save(wallet);
    }

    @Transactional
    public void refund(Long userId, Long reservationId) {
        Wallet wallet = walletRepository.findWalletByUserIdForUpdate(userId)
                .orElseThrow(PaymentErrors.WALLET_NOT_FOUND::toException);
        wallet.refund(PRICE, reservationId);

        walletRepository.save(wallet);
    }
}
