package com.ddbb.dingdong.domain.payment.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class WalletUpdatedEvent {
    private Long walletId;
    private PaymentType type;
    private int amount;
    private int remain;
    private LocalDateTime timestamp;
}
