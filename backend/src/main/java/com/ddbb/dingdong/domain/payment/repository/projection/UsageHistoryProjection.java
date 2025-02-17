package com.ddbb.dingdong.domain.payment.repository.projection;

import com.ddbb.dingdong.domain.payment.entity.vo.DingdongMoneyUsageType;

import java.time.LocalDateTime;

public interface UsageHistoryProjection {
    LocalDateTime getTimeStamp();
    DingdongMoneyUsageType getType();
    int getAmountMoney();
    int getRemainMoney();
}
