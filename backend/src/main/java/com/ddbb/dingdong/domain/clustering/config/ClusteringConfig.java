package com.ddbb.dingdong.domain.clustering.config;

import com.ddbb.dingdong.domain.clustering.util.HaversineDistanceFunction;
import de.lmu.ifi.dbs.elki.algorithm.clustering.kmeans.initialization.RandomUniformGeneratedInitialMeans;
import de.lmu.ifi.dbs.elki.utilities.random.RandomFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 클러스터링 관련 Bean 설정
 */
@Configuration
public class ClusteringConfig {

    @Value("${api.tmap-key}")
    private String tmapKey;

    @Bean
    public HaversineDistanceFunction haversineDistanceFunction() {
        return HaversineDistanceFunction.getInstance();
    }

    @Bean
    public RandomUniformGeneratedInitialMeans randomUniformGeneratedInitialMeans() {
        return new RandomUniformGeneratedInitialMeans(RandomFactory.DEFAULT);
    }

    public String getTmapKey() {
        return tmapKey;
    }
}