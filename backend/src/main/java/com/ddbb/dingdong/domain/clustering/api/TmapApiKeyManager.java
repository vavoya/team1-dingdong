package com.ddbb.dingdong.domain.clustering.api;

import org.springframework.stereotype.Component;

@Component
public class TmapApiKeyManager extends ApiKeyManager {
    public TmapApiKeyManager(TmapApiProperties tmapApiProperties) {
        super(tmapApiProperties.getApikeys());
    }
}
