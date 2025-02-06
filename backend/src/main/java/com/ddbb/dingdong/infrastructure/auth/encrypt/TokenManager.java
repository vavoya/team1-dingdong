package com.ddbb.dingdong.infrastructure.auth.encrypt;

import com.ddbb.dingdong.infrastructure.auth.encrypt.utils.AESEncoder;
import com.ddbb.dingdong.infrastructure.auth.encrypt.utils.SHA512Encoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class TokenManager {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final String DELIMITER = "$";
    private final SHA512Encoder sha512Encoder;
    private final AESEncoder aesEncoder;

    public String generateToken(String data) {
        try {
            String expiredAt = LocalDateTime.now().plusMinutes(5).format(FORMATTER);
            String hash = sha512Encoder.hash(data);
            String tokenData = hash + DELIMITER + expiredAt;
            return aesEncoder.encrypt(tokenData);
        } catch (Exception e) {
            throw new RuntimeException("Error generating token", e);
        }
    }

    public boolean validateToken(String token, String data) {
        try {
            String decryptedData = aesEncoder.decrypt(token);
            String[] parts = decryptedData.split("\\$");

            if (parts.length != 2) return false;

            String originalHashedParam = parts[0];
            LocalDateTime expiredAt = LocalDateTime.parse(parts[1], FORMATTER);

            if (LocalDateTime.now().isAfter(expiredAt)) {
                return false;
            }
            String newHashedParam = sha512Encoder.hash(data);
            if (!newHashedParam.equals(originalHashedParam)) {
                return false;
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
