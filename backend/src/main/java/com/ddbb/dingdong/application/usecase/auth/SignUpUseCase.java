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

@Service
@RequiredArgsConstructor
public class SignUpUseCase implements UseCase<SignUpUseCase.Param, Void> {
    private final AuthManagement authManagement;

    @Override
    public Void execute(Param param) throws DomainException {
        param.validate();
        authManagement.checkEmail(param.getEmail());
        authManagement.checkPassword(param.getPassword());
        authManagement.signUp(param.getName(), param.getEmail(), param.getPassword(), param.getHome(), param.getSchool());
        return null;
    }

    @Getter
    @RequiredArgsConstructor
    public static class Param implements Params {
        private final String name;
        private final String email;
        private final String password;
        private final SignUpRequestDto.Home home;
        private final SignUpRequestDto.School school;

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
            } else if (ParamValidator.isStationInfoExists(home.getStationName(), home.getStationLatitude(), home.getStationLongitude())) {
                if (!ParamValidator.isValidLatitude(home.getStationLatitude())) {
                    throw AuthParamErrors.INVALID_STATION_LATITUDE.toException();
                } else if (!ParamValidator.isValidLongitude(home.getStationLongitude())) {
                    throw AuthParamErrors.INVALID_STATION_LONGITUDE.toException();
                } else if (!ParamValidator.isValidName(home.getStationName())) {
                    throw AuthParamErrors.INVALID_STATION_NAME.toException();
                }
            } if (!ParamValidator.isValidLatitude(school.getLatitude())) {
                throw AuthParamErrors.INVALID_SCHOOL_LATITUDE.toException();
            } else if (!ParamValidator.isValidLongitude(school.getLongitude())) {
                throw AuthParamErrors.INVALID_SCHOOL_LONGITUDE.toException();
            } else if (!ParamValidator.isValidName(school.getName())) {
                throw AuthParamErrors.INVALID_SCHOOL_NAME.toException();
            } else if (!ParamValidator.isValidName(school.getRoadNameAddress())) {
                throw AuthParamErrors.INVALID_SCHOOL_ADDRESS.toException();
            }
            return true;
        }
    }
}
