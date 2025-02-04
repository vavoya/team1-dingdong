package com.ddbb.dingdong.presentation.endpoint.auth;

import com.ddbb.dingdong.application.exception.APIErrors;
import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.auth.LoginUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.presentation.endpoint.auth.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserLoginEndpoint {
    private final LoginUseCase loginUseCase;

    @PostMapping("/login")
    public ResponseEntity<Void> login(
            @RequestBody LoginRequest loginRequest
    ) {
        LoginUseCase.Param param = new LoginUseCase.Param(loginRequest.getEmail(), loginRequest.getPassword());
        try {
            loginUseCase.execute(param);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            throw new APIException(APIErrors.UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.ok().build();
    }
}
