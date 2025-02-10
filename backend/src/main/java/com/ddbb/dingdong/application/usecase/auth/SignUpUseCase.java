package com.ddbb.dingdong.application.usecase.auth;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.application.usecase.auth.errors.AuthParamErrors;
import com.ddbb.dingdong.application.usecase.auth.util.SignUpFieldValidator;
import com.ddbb.dingdong.domain.auth.service.AuthManagement;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.presentation.endpoint.auth.dto.SignUpRequestDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SignUpUseCase implements UseCase<SignUpUseCase.Param, Void> {
    private final AuthManagement authManagement;

    @Override
    public Void execute(Param param) throws DomainException {
        param.validate();
        authManagement.checkEmail(param.getEmail());
        authManagement.signUp(param.getName(), param.getEmail(), param.getPassword(), param.getHome());
        return null;
    }

    @Getter
    @RequiredArgsConstructor
    public static class Param implements Params {
        private final String name;
        private final String email;
        private final String password;
        private final SignUpRequestDto.Home home;

        @Override
        public boolean validate() {
            if (!SignUpFieldValidator.isValidEmail(email)) {
                throw AuthParamErrors.INVALID_EMAIL_FORMAT.toException();
            } else if (!SignUpFieldValidator.isValidPassword(password)) {
                throw AuthParamErrors.INVALID_PASSWORD_FORMAT.toException();
            }
            return true;
        }
    }
}
