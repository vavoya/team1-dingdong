package com.ddbb.dingdong.application.usecase.auth;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.application.usecase.auth.errors.AuthParamErrors;
import com.ddbb.dingdong.util.ParamValidator;
import com.ddbb.dingdong.domain.auth.service.AuthManagement;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.presentation.endpoint.auth.exchanges.SignUpRequestDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SignUpUseCase implements UseCase<SignUpUseCase.Param, Void> {
    private final AuthManagement authManagement;

    @Transactional
    @Override
    public Void execute(Param param) throws DomainException {
        param.validate();
        authManagement.checkEmail(param.getEmail());
        authManagement.checkPassword(param.getPassword());
        authManagement.signUp(param.getName(), param.getEmail(), param.getPassword(), param.getHome(), param.getSchoolId());
        return null;
    }

    @Getter
    @RequiredArgsConstructor
    public static class Param implements Params {
        private final String name;
        private final String email;
        private final String password;
        private final SignUpRequestDto.Home home;
        private final Long schoolId;

        @Override
        public boolean validate() {
            if (!ParamValidator.isValidName(name)) {
                throw AuthParamErrors.INVALID_NAME.toException();
            } else if (!ParamValidator.isValidEmail(email)) {
                throw AuthParamErrors.INVALID_EMAIL_FORMAT.toException();
            } else if (!ParamValidator.isValidPassword(password)) {
                throw AuthParamErrors.INVALID_PASSWORD_FORMAT.toException();
            } else if (!ParamValidator.isValidLatitude(home.getHouseLatitude())) {
                throw AuthParamErrors.INVALID_HOME_LATITUDE.toException();
            } else if (!ParamValidator.isValidLongitude(home.getHouseLongitude())) {
                throw AuthParamErrors.INVALID_HOME_LONGITUDE.toException();
            } else if (!ParamValidator.isValidName(home.getHouseRoadNameAddress())) {
                throw AuthParamErrors.INVALID_ROAD_NAME_ADDRESS.toException();
            } else if (schoolId == null) {
                throw AuthParamErrors.INVALID_SCHOOL_ID.toException();
            }
            return true;
        }
    }
}
