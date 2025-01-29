package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.repository.LocationRepository;
import com.ddbb.dingdong.domain.clustering.util.HaversineDistance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import smile.clustering.KMeans;
import smile.clustering.DBSCAN;

import java.util.Arrays;
import java.util.List;

@Service
public class ClusteringService {

    private final LocationRepository locationRepository;

    private static final Logger logger = LoggerFactory.getLogger(ClusteringService.class);

    public ClusteringService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public void performKmeans(int k) {
        // 1) DB에서 모든 location 데이터 읽어오기
        List<Location> allLocations = locationRepository.findAll();
        if (allLocations.isEmpty()) {
            return; // 데이터가 없으면 아무것도 안 하고 반환
        }

        // 2) double[][] 형태로 (경도, 위도) 좌표 추출
        double[][] data = new double[allLocations.size()][2];
        for (int i = 0; i < allLocations.size(); i++) {
            Location loc = allLocations.get(i);
            data[i][0] = loc.getLatitude();
            data[i][1] = loc.getLongitude();
        }

        // 3) Smile K-Means 수행 (k개의 클러스터)
        KMeans kmeans = KMeans.fit(data, k);
        int[] labels = kmeans.y; // 각 점의 클러스터 라벨 배열

        // 4) 라벨 정보 DB에 업데이트
        for (int i = 0; i < allLocations.size(); i++) {
            allLocations.get(i).setClusterLabel(labels[i] == Integer.MAX_VALUE ? -1 : labels[i]);
        }
        locationRepository.saveAll(allLocations);

        // 필요하다면 중심점(centroids)도 활용 가능
        double[][] centroids = kmeans.centroids;

        logger.info(Arrays.deepToString(centroids));
        logger.info(Arrays.toString(centroids));

    }

    public void performDBScan(double radius) {
        List<Location> allLocations = locationRepository.findAll();
        if (allLocations.isEmpty()) return;

        // data[i][0] = lat, data[i][1] = lon 로 셋팅
        double[][] data = new double[allLocations.size()][2];
        for (int i = 0; i < allLocations.size(); i++) {
            Location loc = allLocations.get(i);
            data[i][0] = loc.getLatitude();
            data[i][1] = loc.getLongitude();
        }

        // DBSCAN 파라미터: Default eps=10.0 (10km), minPts=5
        DBSCAN<double[]> dbscan = DBSCAN.fit(data, new HaversineDistance(), 5, radius);

        // 각 포인트의 클러스터 라벨
        // -1이면 noise
        int[] labels = dbscan.y;

        logger.info("Labels Length: " + labels.length);
        // DB에 반영
        for (int i = 0; i < labels.length; i++) {
            allLocations.get(i).setClusterLabel(labels[i] == Integer.MAX_VALUE ? -1 : labels[i]);
            var point = allLocations.get(i);
            logger.info(i + ") " + point.getLatitude() + ", " + point.getLongitude() + ": " + point.getClusterLabel());
        }

        locationRepository.saveAll(allLocations);
    }
}
