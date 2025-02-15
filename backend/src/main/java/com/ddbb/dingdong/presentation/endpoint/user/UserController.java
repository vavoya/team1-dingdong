package com.ddbb.dingdong.presentation.endpoint.user;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.user.GetUserInfoUseCase;
import com.ddbb.dingdong.application.usecase.user.GetWalletBalanceUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.annotation.LoginUser;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ddbb.dingdong.application.usecase.user.GetUserInfoUseCase.Param;
import static com.ddbb.dingdong.application.usecase.user.GetUserInfoUseCase.Result;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final GetUserInfoUseCase getUserInfoUseCase;
    private final GetWalletBalanceUseCase getWalletBalanceUseCase;

    @GetMapping("/me")
    public Result getUserInfo(
            @LoginUser AuthUser authUser
    ) {
        try {
            return getUserInfoUseCase.execute(new Param(authUser.id()));
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/wallet/balance")
    public ResponseEntity<GetWalletBalanceUseCase.Response> getWalletBalance(
            @LoginUser AuthUser authUser
    ) {
        try {
            GetWalletBalanceUseCase.Param param = new GetWalletBalanceUseCase.Param(authUser.id());
            GetWalletBalanceUseCase.Response result = getWalletBalanceUseCase.execute(param);
            return ResponseEntity.ok(result);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }
}
