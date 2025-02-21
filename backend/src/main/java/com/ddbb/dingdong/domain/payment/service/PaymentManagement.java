package com.ddbb.dingdong.domain.payment.service;

import com.ddbb.dingdong.domain.payment.entity.Wallet;
import com.ddbb.dingdong.domain.payment.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentManagement {
    private static final int TICKET_PRICE = 1000;
    private static final int FREE_CHARGE_PRICE = 1000;
    private final WalletRepository walletRepository;

    public void pay(Long userId, int quantity) {
        Wallet wallet = walletRepository.findWalletByUserIdForUpdate(userId)
                .orElseThrow(PaymentErrors.WALLET_NOT_FOUND::toException);
        int totalPrice = quantity * TICKET_PRICE;
        wallet.pay(totalPrice);
    }

    public void refund(Long userId, Long reservationId) {
        Wallet wallet = walletRepository.findWalletByUserIdForUpdate(userId)
                .orElseThrow(PaymentErrors.WALLET_NOT_FOUND::toException);
        wallet.refund(TICKET_PRICE, reservationId);
    }

    public void freeCharge(Long userId) {
        Wallet wallet = walletRepository.findWalletByUserIdForUpdate(userId)
                .orElseThrow(PaymentErrors.WALLET_NOT_FOUND::toException);
        if(walletRepository.existsFreeChargeTodayByUserId(userId)) {
            throw PaymentErrors.FREE_CHARGE_LIMIT_EXCEEDED.toException();
        }
        wallet.freeCharge(FREE_CHARGE_PRICE);
    }
}
