package com.ddbb.dingdong.presentation.endpoint.admin.exchanges;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.concurrent.TimeUnit;

@Getter
@NoArgsConstructor
public class BusStartRequestDTO {
    private Long busScheduleId;
    private Long interval = 1L;
    private Long delay = 0L;
    private TimeUnit timeUnit  = TimeUnit.SECONDS;
}
