package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.repository.LocationRepository;
import com.ddbb.dingdong.domain.clustering.service.error.ClusterErrors;
import com.ddbb.dingdong.infrastructure.clustering.ElkiCluster;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClusteringService {
    private final ElkiCluster elkiCluster;
    private final LocationRepository locationRepository;

    public void cluster(List<Location> locationInfos) {
        List<Location> clusters = elkiCluster.elkiDBScan(locationInfos,3, 2);
        locationRepository.saveAll(clusters);
    }

    public List<Location> findByClusterLabel(Long clusterLabel) {
        List<Location> cluster = locationRepository.findAllByClusterLabel(clusterLabel);
        if(cluster.isEmpty()) {
            throw ClusterErrors.NOT_FOUND.toException();
        }

        return cluster;
    }
}
