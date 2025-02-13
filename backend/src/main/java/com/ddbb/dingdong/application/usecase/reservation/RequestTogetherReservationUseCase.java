package com.ddbb.dingdong.application.usecase.reservation;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.infrastructure.auth.encrypt.TokenManager;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequestTogetherReservationUseCase implements UseCase<RequestTogetherReservationUseCase.Param, RequestTogetherReservationUseCase.Result> {
    private final TokenManager tokenManager;

    @Override
    public Result execute(Param param) {
        String token = generateToken(param);

        return new Result(token);
    }

    private String generateToken(Param param) {
        return tokenManager.generateToken(param);
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Long busStopId;
        private Long busScheduleId;
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        private String token;
    }
}
