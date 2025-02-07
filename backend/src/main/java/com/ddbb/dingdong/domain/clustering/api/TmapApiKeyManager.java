package com.ddbb.dingdong.domain.clustering.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TmapApiKeyManager extends ApiKeyManager {
    public TmapApiKeyManager(@Value("${api.tmap.api-keys}") List<String> apiKeys) {
        super(apiKeys);
    }
}
