package com.ddbb.dingdong.application.usecase.user;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetUserInfoUseCase implements UseCase<GetUserInfoUseCase.Param, GetUserInfoUseCase.Result> {
    @Override
    public Result execute(Param param) {
        return null;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        private String userName;
        private String email;
        private String schoolName;
    }
}
