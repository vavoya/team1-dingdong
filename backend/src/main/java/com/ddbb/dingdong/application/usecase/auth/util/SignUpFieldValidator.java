package com.ddbb.dingdong.application.usecase.auth.util;

import java.util.regex.Pattern;

public class SignUpFieldValidator {
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);
    private static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);

    /**
     * 이메일이 올바른 형식인지 확인
     * @param email 검증할 이메일 문자열
     * @return true: 올바른 이메일, false: 올바르지 않은 이메일
     */
    public static boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * 비밀번호가 올바른 형식인지 확인
     * @param password 검증할 비밀번호 문자열
     * @return true: 올바른 비밀번호, false: 올바르지 않은 비밀번호
     */
    public static boolean isValidPassword(String password) {
        return PASSWORD_PATTERN.matcher(password).matches();
    }
}
