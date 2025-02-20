package com.ddbb.dingdong.infrastructure.auth.encrypt.token;

public interface TokenRepository {
    boolean existsByToken(String token);
    void save(String token);
}
