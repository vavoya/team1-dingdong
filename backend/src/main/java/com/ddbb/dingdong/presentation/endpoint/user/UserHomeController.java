package com.ddbb.dingdong.presentation.endpoint.user;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.user.GetHomeLocationUseCase;
import com.ddbb.dingdong.application.usecase.user.ChangeUserStationUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.infrastructure.auth.security.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.security.annotation.LoginUser;
import com.ddbb.dingdong.presentation.endpoint.user.exchanges.UpdateHomeLocationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/home")
public class UserHomeController {
    private final GetHomeLocationUseCase getHomeLocationUseCase;
    private final ChangeUserStationUseCase changeUserStationUseCase;

    @GetMapping("/locations")
    public ResponseEntity<GetHomeLocationUseCase.Result> getUserHomeLocations(
            @LoginUser AuthUser user
    ) {
        Long userId = user.id();
        GetHomeLocationUseCase.Param param = new GetHomeLocationUseCase.Param(userId);
        GetHomeLocationUseCase.Result result;
        try {
            result = getHomeLocationUseCase.execute(param);
        } catch (DomainException ex) {
            throw new APIException(ex, HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(result);
    }

    @PutMapping
    public ResponseEntity<Void> updateUserHomeLocation(
            @LoginUser AuthUser user,
            @RequestBody UpdateHomeLocationDto dto
    ) {
        Long userId = user.id();
        ChangeUserStationUseCase.Param param = new ChangeUserStationUseCase.Param(
                userId,
                dto.getStationName(),
                dto.getStationRoadAddressName(),
                dto.getLatitude(),
                dto.getLongitude()
        );
        try {
            changeUserStationUseCase.execute(param);
        } catch (DomainException ex) {
            throw new APIException(ex, HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().build();
    }
}
