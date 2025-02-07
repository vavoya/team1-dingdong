package com.ddbb.dingdong.domain.clustering.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Component
@AllArgsConstructor
@ConfigurationProperties(prefix = "api.tmap")
public class TmapApiProperties {
    private List<String> apikeys;
}
