package com.ddbb.dingdong.domain.clustering.service;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.repository.LocationRepository;
import com.ddbb.dingdong.domain.clustering.util.HaversineDistanceFunction;
import de.lmu.ifi.dbs.elki.algorithm.clustering.kmeans.KMeansLloyd;
import de.lmu.ifi.dbs.elki.algorithm.clustering.kmeans.initialization.RandomUniformGeneratedInitialMeans;
import de.lmu.ifi.dbs.elki.data.Cluster;
import de.lmu.ifi.dbs.elki.data.Clustering;
import de.lmu.ifi.dbs.elki.data.NumberVector;
import de.lmu.ifi.dbs.elki.data.model.KMeansModel;
import de.lmu.ifi.dbs.elki.data.model.Model;
import de.lmu.ifi.dbs.elki.data.type.TypeUtil;
import de.lmu.ifi.dbs.elki.database.Database;
import de.lmu.ifi.dbs.elki.database.StaticArrayDatabase;
import de.lmu.ifi.dbs.elki.database.ids.DBIDIter;
import de.lmu.ifi.dbs.elki.database.ids.DBIDRange;
import de.lmu.ifi.dbs.elki.database.relation.Relation;
import de.lmu.ifi.dbs.elki.datasource.ArrayAdapterDatabaseConnection;
import de.lmu.ifi.dbs.elki.datasource.DatabaseConnection;
import de.lmu.ifi.dbs.elki.utilities.random.RandomFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import smile.clustering.DBSCAN;
import smile.clustering.KMeans;

import java.util.Arrays;
import java.util.List;

@Service
public class ClusteringService {

    private final LocationRepository locationRepository;

    private static final Logger logger = LoggerFactory.getLogger(ClusteringService.class);

    public ClusteringService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public void smileKmeans(int k) {
        // 1) DB에서 모든 location 데이터 읽어오기
        List<Location> allLocations = locationRepository.findAll();
        if (allLocations.isEmpty()) {
            return; // 데이터가 없으면 아무것도 안 하고 반환
        }

        // 2) double[][] 형태로 (위도, 경도) 좌표 추출
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

    public void smileDBScan(double radius, int minPts) {
        List<Location> allLocations = locationRepository.findAll();
        if (allLocations.isEmpty()) return;

        // data[i][0] = lat, data[i][1] = lon 로 셋팅
        double[][] data = new double[allLocations.size()][2];
        for (int i = 0; i < allLocations.size(); i++) {
            Location loc = allLocations.get(i);
            data[i][0] = loc.getLatitude();
            data[i][1] = loc.getLongitude();
        }

        // DBSCAN 파라미터: Default eps=3.0 (3km), minPts=2
        DBSCAN<double[]> dbscan = DBSCAN.fit(data, new HaversineDistanceFunction(), minPts, radius);

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

    public void elkiKmeans(int k) {
        List<Location> allLocations = locationRepository.findAll();

        // ELKI DB에 저장할 double[][] 데이터 초기화
        double[][] data = new double[allLocations.size()][2];
        for (int i = 0; i < allLocations.size(); i++) {
            Location loc = allLocations.get(i);
            data[i][0] = loc.getLatitude();
            data[i][1] = loc.getLongitude();
        }

        // ELKI DB 연결
        DatabaseConnection memconn = new ArrayAdapterDatabaseConnection(data);

        // StaticArrayDatabase로 초기화
        Database db = new StaticArrayDatabase(memconn, null);
        db.initialize();

        // K-Means에 활용할 매개변수 초기화
        RandomUniformGeneratedInitialMeans init = new RandomUniformGeneratedInitialMeans(RandomFactory.DEFAULT);

        // ELKI K-Means 수행 (초기 값: k(클러스터 수, 초기값: 3))
        KMeansLloyd<NumberVector> kmeans = new KMeansLloyd<>(new HaversineDistanceFunction(), k, 0, init);

        Clustering<KMeansModel> result = kmeans.run(db);

        // 각 노드의 결과 라벨 노이즈 값으로 초기화 (노이즈 = -1)
        int[] labels = new int[allLocations.size()];
        for (int i = 0; i < allLocations.size(); i++) {
            labels[i] = -1;
        }

        Relation<NumberVector> relation = db.getRelation(TypeUtil.NUMBER_VECTOR_FIELD);
        DBIDRange ids = (DBIDRange) relation.getDBIDs();

        // 결과 추출
        List<? extends Cluster<KMeansModel>> clusters = result.getAllClusters();
        int cid = 0; // 결과에 해당하는 클러스터 ID 부여
        for (Cluster<KMeansModel> cluster : clusters) {
            if (!cluster.isNoise()) {
                // internalGetIndex() 사용 시, Offset이 꼬일 수 있으므로 사용하지 말 것
                for (DBIDIter it = cluster.getIDs().iter(); it.valid(); it.advance()) {
                    final int offset = ids.getOffset(it);
                    labels[offset] = cid;
                }
                cid++;
            }
        }

        for (int i = 0; i < allLocations.size(); i++) {
            allLocations.get(i).setClusterLabel(labels[i]);
        }
        locationRepository.saveAll(allLocations);
    }

    public void elkiDBScan(double radius, int minPts) {
        List<Location> allLocations = locationRepository.findAll();

        // ELKI DB에 저장할 double[][] 데이터 초기화
        double[][] data = new double[allLocations.size()][2];
        for (int i = 0; i < allLocations.size(); i++) {
            Location loc = allLocations.get(i);
            data[i][0] = loc.getLatitude();
            data[i][1] = loc.getLongitude();
        }

        // ELKI DB 연결
        DatabaseConnection memconn = new ArrayAdapterDatabaseConnection(data);

        // StaticArrayDatabase로 초기화
        Database db = new StaticArrayDatabase(memconn, null);
        db.initialize();

        // ELKI DBSCAN에 사용할 매개변수 초기화
        de.lmu.ifi.dbs.elki.algorithm.clustering.DBSCAN<NumberVector> dbscan = new de.lmu.ifi.dbs.elki.algorithm.clustering.DBSCAN<>(HaversineDistanceFunction.getInstance(), radius, minPts);

        // ELKI DBSCAN 수행 (초기 값: eps = 3.0(3km), minPts = 2)
        Clustering<Model> result = dbscan.run(db);

        // 각 노드의 결과 라벨 노이즈 값으로 초기화 (노이즈 = -1)
        int[] labels = new int[allLocations.size()];
        for (int i = 0; i < allLocations.size(); i++) {
            labels[i] = -1;
        }

        Relation<NumberVector> relation = db.getRelation(TypeUtil.NUMBER_VECTOR_FIELD);
        DBIDRange ids = (DBIDRange) relation.getDBIDs();

        // 결과 추출
        List<? extends Cluster<Model>> clusters = result.getAllClusters();
        int cid = 0; // 결과에 해당하는 클러스터 ID 값 부여
        for (Cluster<Model> cluster : clusters) {
            if (!cluster.isNoise()) {
                // internalGetIndex() 사용 시, Offset이 꼬일 수 있으므로 사용하지 말 것
                for (DBIDIter it = cluster.getIDs().iter(); it.valid(); it.advance()) {
                    final int offset = ids.getOffset(it);
                    labels[offset] = cid;
                }
                cid++;
            }
        }

        for (int i = 0; i < allLocations.size(); i++) {
            allLocations.get(i).setClusterLabel(labels[i]);
        }
        locationRepository.saveAll(allLocations);
    }
}
