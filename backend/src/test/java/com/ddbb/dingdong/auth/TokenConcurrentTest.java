package com.ddbb.dingdong.auth;

import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.infrastructure.auth.encrypt.token.CachedTokenProvider;
import com.ddbb.dingdong.infrastructure.auth.encrypt.token.TokenErrors;
import com.ddbb.dingdong.infrastructure.auth.encrypt.token.TokenManager;
import com.ddbb.dingdong.infrastructure.auth.encrypt.utils.AESEncoder;
import com.ddbb.dingdong.infrastructure.auth.encrypt.utils.SHA512Encoder;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TokenConcurrentTest {
    private final TokenManager tokenManager = new TokenManager(new SHA512Encoder(), new AESEncoder(), new CachedTokenProvider());

    static class DummyTarget {
        private String data;
        public DummyTarget(String data) {
            this.data = data;
        }
        public String getData() {
            return data;
        }
    }

    @Test
    @DisplayName("중복 토큰을 동시에 1000회 저장요청할때, 토큰 중복에러가 정확히 999번이 뜨는지 검증")
    public void testTokenSaveConcurrently() throws InterruptedException {
        DummyTarget object = new DummyTarget("dummy");
        String token = tokenManager.generateToken(object);
        int threadCount = 1000;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch doneLatch = new CountDownLatch(threadCount);

        List<Callable<Boolean>> tasks = new ArrayList<>();
        for (int i = 0; i < threadCount; i++) {
            tasks.add(() -> {
                startLatch.await(); // 모든 스레드가 동시에 시작되도록 대기
                try {
                    tokenManager.validateToken(token, object);
                    tokenManager.saveToken(token);
                    return true;
                } catch (DomainException e) {
                    if(e.error.equals(TokenErrors.ALREADY_USED)) {
                        return false;
                    }
                    return true;
                } catch (Exception e) {
                    return true;
                }
                finally {
                    doneLatch.countDown();
                }
            });
        }

        startLatch.countDown();
        List<Future<Boolean>> futures = executor.invokeAll(tasks);
        doneLatch.await();
        executor.shutdown();

        int successCount = 0;
        int failureCount = 0;
        for (Future<Boolean> future : futures) {
            try {
                if (future.get()) {
                    successCount++;
                } else {
                    failureCount++;
                }
            } catch (ExecutionException e) {
                failureCount++;
            }
        }

        // 검증: 1000번의 시도 중 정확히 1번의 성공, 999번의 실패가 발생해야 합니다.
        assertEquals(1, successCount, "Exactly one thread should succeed in validating the token.");
        assertEquals(999, failureCount, "Exactly 99 threads should fail with 'token already used' error.");

    }


}
