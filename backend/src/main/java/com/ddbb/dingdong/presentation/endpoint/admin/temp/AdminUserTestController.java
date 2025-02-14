package com.ddbb.dingdong.presentation.endpoint.admin.temp;

import com.ddbb.dingdong.domain.user.entity.User;
import com.ddbb.dingdong.domain.user.repository.UserRepository;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.annotation.LoginUser;
import com.ddbb.dingdong.presentation.endpoint.admin.temp.dto.GetUserInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/test/users")
public class AdminUserTestController {
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
}
