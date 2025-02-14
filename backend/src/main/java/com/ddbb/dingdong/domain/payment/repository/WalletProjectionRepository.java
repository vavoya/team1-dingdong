package com.ddbb.dingdong.domain.payment.repository;

import com.ddbb.dingdong.domain.payment.entity.Wallet;
import com.ddbb.dingdong.domain.payment.repository.projection.FailedRefundProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WalletProjectionRepository extends JpaRepository<Wallet, Long> {
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
}
