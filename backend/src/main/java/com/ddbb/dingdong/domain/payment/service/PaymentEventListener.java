package com.ddbb.dingdong.domain.payment.service;

import com.ddbb.dingdong.domain.reservation.service.event.AllocationFailedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class PaymentEventListener {
    private final PaymentManagement paymentManagement;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @EventListener
    public void refundEventListener(AllocationFailedEvent event) {
        Long userId = event.getUserId();
        Long reservationId = event.getReservationId();
        paymentManagement.refund(userId, reservationId);
    }
}
