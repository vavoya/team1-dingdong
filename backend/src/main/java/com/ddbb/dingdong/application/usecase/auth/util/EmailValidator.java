package com.ddbb.dingdong.application.usecase.auth.util;

import java.util.regex.Pattern;

public class EmailValidator {
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    /**
     * 이메일이 올바른 형식인지 확인
     * @param email 검증할 이메일 문자열
     * @return true: 올바른 이메일, false: 올바르지 않은 이메일
     */
    public static boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }
}
