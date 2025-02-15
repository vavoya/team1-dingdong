package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetBusStopLocationUseCase implements UseCase<GetBusStopLocationUseCase.Param, GetBusStopLocationUseCase.Response> {
    @Override
    public Response execute(Param param) {
        return null;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Long busScheduleId;
    }

    @AllArgsConstructor
    public static class Response {
        private Double longitude;
        private Double latitude;
    }
}
