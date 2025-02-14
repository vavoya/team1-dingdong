package com.ddbb.dingdong.presentation.endpoint.admin.temp;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.user.ChangeUserStationUseCase;
import com.ddbb.dingdong.application.usecase.user.FastSignUpUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.UserRepository;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.annotation.LoginUser;
import com.ddbb.dingdong.presentation.endpoint.admin.temp.dto.FastSignUpDTO;
import com.ddbb.dingdong.presentation.endpoint.admin.temp.dto.GetUserInfoDTO;
import com.ddbb.dingdong.presentation.endpoint.admin.temp.dto.UserHomeUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/test/users")
public class AdminUserTestController {
    private final FastSignUpUseCase fastSignUpUseCase;
    private final ChangeUserStationUseCase changeUserStationUseCase;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<GetUserInfoDTO> getAllUsers(
            @LoginUser AuthUser admin
    ) {
        List<User> users = userRepository.findAllUser();
        List<GetUserInfoDTO.Item> userInfoList = users.stream()
                .map(user -> new GetUserInfoDTO.Item(
                        user.getId(),
                        user.getHome().getHouseLongitude(),
                        user.getHome().getHouseLatitude(),
                        user.getHome().getStationLongitude(),
                        user.getHome().getStationLatitude(),
                        user.getHome().getStationName(),
                        user.getEmail()
                ))
                .toList();

        return ResponseEntity.ok(new GetUserInfoDTO(userInfoList));
    }

    @PutMapping
    public ResponseEntity<Void> putHomeLocation(
            @RequestBody UserHomeUpdateDTO dto
    ) {
        ChangeUserStationUseCase.Param param = new ChangeUserStationUseCase.Param(
                dto.getUserId(),
                dto.getStationName(),
                dto.getStationRoadAddressName(),
                dto.getStationLatitude(),
                dto.getStationLongitude()
        );
        try {
            changeUserStationUseCase.execute(param);
            return null;
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/fast-signup")
    public ResponseEntity<Void> postHomeLocation(
            @RequestBody FastSignUpDTO dto
    ) {
        try {
            FastSignUpUseCase.Param param = new FastSignUpUseCase.Param(
                    dto.getName(),
                    dto.getEmail(),
                    dto.getPassword(),
                    dto.getHouseRoadNameAddress(),
                    dto.getStationLatitude(),
                    dto.getStationLongitude()
            );
            fastSignUpUseCase.execute(param);
            return null;
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.BAD_REQUEST);
        }
    }
}
