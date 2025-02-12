package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Service;

@Service
public class StartBusUseCase implements UseCase<StartBusUseCase.Param, Void> {

    @Override
    public Void execute(StartBusUseCase.Param param) {
        return null;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long busScheduleId;
    }
}
