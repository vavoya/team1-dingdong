package com.ddbb.dingdong.presentation.endpoint.user;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.user.*;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.infrastructure.auth.security.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.security.annotation.LoginUser;
import com.ddbb.dingdong.presentation.endpoint.user.exchanges.EnrollFCMTokenRequest;
import com.ddbb.dingdong.presentation.endpoint.user.exchanges.ChangeTimetableDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final GetUserInfoUseCase getUserInfoUseCase;
    private final GetWalletBalanceUseCase getWalletBalanceUseCase;
    private final GetWalletHistoryUseCase getWalletHistoryUseCase;
    private final GetTimetableUseCase getTimetableUseCase;
    private final ChangeTimetableUseCase changeTimetableUseCase;
    private final ChargeDingdongMoneyFreeUseCase chargeDingdongMoneyFreeUseCase;
    private final CheckFreeChargeAvailableUseCase checkFreeChargeAvailableUseCase;
    private final EnrollFCMTokenUseCase enrollFCMTokenUseCase;
    private final TestFCMNotificationUseCase testFCMNotificationUseCase;

    @GetMapping("/me")
    public GetUserInfoUseCase.Result getUserInfo(
            @LoginUser AuthUser authUser
    ) {
        try {
            return getUserInfoUseCase.execute(new GetUserInfoUseCase.Param(authUser.id()));
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/fcm-token")
    public ResponseEntity<Void> fcmToken(
            @LoginUser AuthUser authUser,
            @RequestBody EnrollFCMTokenRequest request
    ) {
        try {
            EnrollFCMTokenUseCase.Param param = new EnrollFCMTokenUseCase.Param(authUser.id(), request.getToken());
            enrollFCMTokenUseCase.execute(param);
            return ResponseEntity.ok().build();
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

    @GetMapping("/wallet/history")
    public ResponseEntity<GetWalletHistoryUseCase.Result> getWalletHistory(
            @LoginUser AuthUser authUser,
            @RequestParam("page") int page,
            @RequestParam(value = "pageSize",defaultValue = "-1") int pageSize
    ) {
        Pageable pageable = pageSize == -1 ? Pageable.unpaged() : PageRequest.of(page, pageSize);
        Long userId = authUser.id();
        GetWalletHistoryUseCase.Param param = new GetWalletHistoryUseCase.Param(userId, pageable);
        GetWalletHistoryUseCase.Result result = getWalletHistoryUseCase.execute(param);

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/timetable")
    public ResponseEntity<GetTimetableUseCase.Result> getTimetable(
            @LoginUser AuthUser authUser
    ) {
        Long userId = authUser.id();
        GetTimetableUseCase.Param param = new GetTimetableUseCase.Param(userId);
        GetTimetableUseCase.Result result;
        try {
            result = getTimetableUseCase.execute(param);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/timetable")
    public ResponseEntity<Void> putTimetable(
            @LoginUser AuthUser authUser,
            @RequestBody ChangeTimetableDto changeTimetableDto
    ) {
        Long userId = authUser.id();
        ChangeTimetableUseCase.Param param = new ChangeTimetableUseCase.Param(
                userId,
                changeTimetableDto.getMonStartTime(),
                changeTimetableDto.getMonEndTime(),
                changeTimetableDto.getTueStartTime(),
                changeTimetableDto.getTueEndTime(),
                changeTimetableDto.getWedStartTime(),
                changeTimetableDto.getWedEndTime(),
                changeTimetableDto.getThuStartTime(),
                changeTimetableDto.getThuEndTime(),
                changeTimetableDto.getFriStartTime(),
                changeTimetableDto.getFriEndTime()
        );
        try {
            changeTimetableUseCase.execute(param);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/wallet/charge/free")
    public ResponseEntity<Void> chargeDingdongMoneyFree(
            @LoginUser AuthUser authUser
    ) {
        Long userId = authUser.id();
        ChargeDingdongMoneyFreeUseCase.Param param = new ChargeDingdongMoneyFreeUseCase.Param(userId);
        try {
            chargeDingdongMoneyFreeUseCase.execute(param);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/wallet/charge/free/available")
    public ResponseEntity<CheckFreeChargeAvailableUseCase.Result> checkFreeChargeAvailable(
            @LoginUser AuthUser authUser
    ) {
        Long userId = authUser.id();
        CheckFreeChargeAvailableUseCase.Param param = new CheckFreeChargeAvailableUseCase.Param(userId);
        CheckFreeChargeAvailableUseCase.Result result;
        try {
            result = checkFreeChargeAvailableUseCase.execute(param);
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/fcm-token/test")
    public ResponseEntity<Void> testFcmToken(
            @LoginUser AuthUser authUser
    ) {
        Long userId = authUser.id();
        try {
            TestFCMNotificationUseCase.Param param = new TestFCMNotificationUseCase.Param(userId);
            return ResponseEntity.ok().build();
        } catch (DomainException e) {
            throw new APIException(e, HttpStatus.NOT_FOUND);
        }
    }
}
