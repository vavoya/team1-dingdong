package com.ddbb.dingdong.domain.payment.repository;

import java.util.List;
import java.util.Optional;

import com.ddbb.dingdong.domain.payment.repository.projection.UsageHistoryProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ddbb.dingdong.domain.payment.entity.Wallet;
import com.ddbb.dingdong.domain.payment.repository.projection.FailedRefundProjection;
import com.ddbb.dingdong.domain.payment.repository.projection.BalanceProjection;

public interface WalletQueryRepository extends JpaRepository<Wallet, Long> {
    @Query("""
        SELECT r.id AS reservationId, u.id AS userId
        FROM Reservation r
        JOIN User u ON r.userId = u.id
        JOIN Wallet w ON w.userId = u.id
        LEFT JOIN DingdongMoneyUsageHistory history
            ON w.id = history.wallet.id
            AND history.refundedReservationId = r.id
            AND history.type = 'REFUND'
        WHERE r.status = 'FAIL_ALLOCATED'
        AND history.id IS NULL
    """)
    List<FailedRefundProjection> queryAllFailedRefund();

    @Query("SELECT wallet.balance as balance FROM Wallet wallet WHERE wallet.userId = :userId")
    Optional<BalanceProjection> getBalance(@Param("userId") Long userId);

    @Query("""
    SELECT
        history.timeStamp AS timeStamp,
        history.amount AS amountMoney,
        history.remain AS remainMoney,
        history.type AS type
    FROM DingdongMoneyUsageHistory history
    JOIN Wallet w ON w.userId = :userId
    WHERE history.wallet.id = w.id
    ORDER BY history.timeStamp DESC
    """)
    Page<UsageHistoryProjection> getUsageHistory(@Param("userId") Long userId, Pageable pageable);
}
