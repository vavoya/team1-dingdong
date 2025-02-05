package com.ddbb.dingdong.presentation.endpoint.user.home;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.user.GetHomeLocationUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.annotation.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/home")
public class UserHomeEndpoint {
    private final GetHomeLocationUseCase getHomeLocationUseCase;

    @GetMapping("/locations")
    public ResponseEntity<GetHomeLocationUseCase.Response> getUserHomeLocations(@LoginUser AuthUser user) {
        Long userId = user.id();
        GetHomeLocationUseCase.Param param = new GetHomeLocationUseCase.Param(userId);
        GetHomeLocationUseCase.Response response;
        try {
            response = getHomeLocationUseCase.execute(param);
        } catch (DomainException ex) {
            throw new APIException(ex, HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(response);
    }
}
