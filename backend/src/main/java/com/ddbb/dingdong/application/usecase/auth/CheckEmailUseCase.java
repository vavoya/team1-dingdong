package com.ddbb.dingdong.application.usecase.auth;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.application.usecase.auth.errors.AuthParamErrors;
import com.ddbb.dingdong.application.usecase.auth.util.SignUpFieldValidator;
import com.ddbb.dingdong.domain.auth.service.AuthManagement;
import com.ddbb.dingdong.presentation.endpoint.auth.dto.CheckEmailDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckEmailUseCase implements UseCase<CheckEmailUseCase.Param, Void> {
    private final AuthManagement authManagement;

    @Override
    public Void execute(Param param) {
        param.validate();
        String email = param.dto.getEmail();
        authManagement.checkEmail(email);
        return null;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private CheckEmailDto dto;

        @Override
        public boolean validate() {
            String email = dto.getEmail();
            if (email == null || email.isBlank()) {
                throw AuthParamErrors.EMAIL_REQUIRED.toException();
            } else if (!SignUpFieldValidator.isValidEmail(email)) {
                throw AuthParamErrors.INVALID_EMAIL_FORMAT.toException();
            }
            return true;
        }
    }
}
