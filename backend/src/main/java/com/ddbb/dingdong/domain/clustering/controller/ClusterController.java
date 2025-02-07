package com.ddbb.dingdong.domain.clustering.controller;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.service.ElkiClusteringService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cluster")
public class ClusterController {

    private final ElkiClusteringService elkiClusteringService;

    @GetMapping("/elki/kmeans")
    public String elkiKmeans(@RequestParam(defaultValue = "3") int k) {
        elkiClusteringService.elkiKmeans(k);
        return "ELKI - K-Means 클러스터링 완료! 클러스터 수 = " + k;
    }

    @GetMapping("/elki/dbscan")
    public String elkiDBScan(@RequestParam(defaultValue = "3") double radius, @RequestParam(defaultValue = "2") int minPts) {
        List<Location> locations = elkiClusteringService.elkiDBScan(radius, minPts);
        if (locations == null) return "클러스터링 실패";
        return "ELKI - DBSCAN 클러스터링 완료! 반경 = " + radius + "km" + ", 최소 점 갯수 = " + minPts;
    }
}