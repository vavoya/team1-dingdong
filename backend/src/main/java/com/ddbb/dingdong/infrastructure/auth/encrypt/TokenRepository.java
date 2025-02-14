package com.ddbb.dingdong.infrastructure.auth.encrypt;

import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<Token, Long> {
    boolean existsByToken(String token);
}
