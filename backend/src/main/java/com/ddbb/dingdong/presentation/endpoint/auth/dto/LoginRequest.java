package com.ddbb.dingdong.presentation.endpoint.auth.dto;

import lombok.Getter;

@Getter
public class LoginRequest {
    private String email;
    private String password;
}