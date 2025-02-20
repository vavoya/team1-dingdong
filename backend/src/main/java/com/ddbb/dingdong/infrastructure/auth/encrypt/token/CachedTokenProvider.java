package com.ddbb.dingdong.infrastructure.auth.encrypt.token;

import com.ddbb.dingdong.infrastructure.cache.SimpleCache;
import org.springframework.stereotype.Component;

@Component
public class CachedTokenProvider implements TokenRepository {
    private static final int TOKEN_VALIDATE_MINUTES = 5;
    private final SimpleCache<String, String> tokenSimpleCache = new SimpleCache<>(TOKEN_VALIDATE_MINUTES);

    @Override
    public boolean existsByToken(String token) {
        return tokenSimpleCache.containsKey(token);
    }

    @Override
    public synchronized void save(String token) {
        if (tokenSimpleCache.containsKey(token)) {
            throw TokenErrors.ALREADY_USED.toException();
        }
        tokenSimpleCache.put(token, token);
    }
}
