package com.ddbb.dingdong.domain.payment.entity;

import com.ddbb.dingdong.domain.payment.service.PaymentErrors;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Integer balance;

    @Column(nullable = false)
    private LocalDateTime lastUpdatedAt;

    public int pay(int totalPrice) {
        if(this.balance < totalPrice) {
            throw PaymentErrors.INSUFFICIENT_BALANCE.toException();
        }
        this.balance -= totalPrice;
        lastUpdatedAt = LocalDateTime.now();
        return this.balance;
    }
}
