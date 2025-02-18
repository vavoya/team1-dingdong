package com.ddbb.dingdong.domain.payment.repository;

import com.ddbb.dingdong.domain.payment.entity.Wallet;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT w FROM Wallet w WHERE w.userId = :userId")
    Optional<Wallet> findWalletByUserIdForUpdate(Long userId);

    @Query("""
        SELECT CASE WHEN COUNT(h) > 0 THEN true ELSE false END
        FROM DingdongMoneyUsageHistory h
        WHERE h.wallet.userId = :userId
        AND h.type = 'FREE_CHARGE'
        AND h.timeStamp >= CURRENT_DATE
    """)
    boolean existsFreeChargeTodayByUserId(@Param("userId") Long userId);}
