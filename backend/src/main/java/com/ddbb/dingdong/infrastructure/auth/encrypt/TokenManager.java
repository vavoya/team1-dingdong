package com.ddbb.dingdong.infrastructure.auth.encrypt;

import com.ddbb.dingdong.infrastructure.auth.encrypt.utils.AESEncoder;
import com.ddbb.dingdong.infrastructure.auth.encrypt.utils.SHA512Encoder;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final TokenRepository tokenRepository;

    public String generateToken(Object target) {
        String data;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            data = objectMapper.writeValueAsString(target);
            String expiredAt = LocalDateTime.now().plusMinutes(5).format(FORMATTER);
            String hash = sha512Encoder.hash(data);
            String tokenData = hash + DELIMITER + expiredAt;
            return aesEncoder.encrypt(tokenData);
        } catch (Exception e) {
            throw new RuntimeException("Error generating token", e);
        }
    }

    public boolean validateToken(String token, Object target)  {
        if(tokenRepository.existsByToken(token)) {
            throw TokenErrors.ALREADY_USED.toException();
        }

        String data;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            data = objectMapper.writeValueAsString(target);
        } catch (JsonProcessingException e) {
            throw TokenErrors.INVALID.toException();
        }

        String decryptedData;

        try {
             decryptedData = aesEncoder.decrypt(token);
        } catch (Exception e) {
            throw new RuntimeException("Error validating token", e);
        }

        String[] parts = decryptedData.split("\\"+DELIMITER);
        if (parts.length != 2) throw TokenErrors.INVALID.toException();

        String originalHashedParam = parts[0];
        LocalDateTime expiredAt = LocalDateTime.parse(parts[1], FORMATTER);

        if (LocalDateTime.now().isAfter(expiredAt)) throw TokenErrors.EXPIRED.toException();

        String newHashedParam = sha512Encoder.hash(data);
        if (!newHashedParam.equals(originalHashedParam)) throw TokenErrors.INCORRECT_SIGNATURE.toException();

        return true;
    }

    public void saveToken(String token) {
        Token newToken = new Token();
        newToken.setToken(token);
        tokenRepository.save(newToken);
    }

}
