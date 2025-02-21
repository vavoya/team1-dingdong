package com.ddbb.dingdong.infrastructure.auth.encrypt.token;

import com.ddbb.dingdong.infrastructure.cache.SimpleCache;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class CachedTokenProvider implements TokenRepository {
    private static final Duration TTL = Duration.ofMinutes(5);
    private final SimpleCache tokenSimpleCache;

    @Override
    public boolean existsByToken(String token) {
        return tokenSimpleCache.containsKey(token);
    }

    @Override
    public synchronized void save(String token) {
        if (tokenSimpleCache.containsKey(token)) {
            throw TokenErrors.ALREADY_USED.toException();
        }
        tokenSimpleCache.put(token, TTL);
    }
}
