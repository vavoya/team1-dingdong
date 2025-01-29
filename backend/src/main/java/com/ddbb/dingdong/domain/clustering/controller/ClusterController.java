package com.ddbb.dingdong.domain.clustering.controller;

import com.ddbb.dingdong.domain.clustering.service.ClusteringService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cluster")
public class ClusterController {

    private final ClusteringService clusteringService;

    public ClusterController(ClusteringService clusteringService) {
        this.clusteringService = clusteringService;
    }

    @GetMapping("/kmeans")
    public String performKmeans(@RequestParam(defaultValue = "3") int k) {
        clusteringService.performKmeans(k);
        return "K-Means 클러스터링 완료! 클러스터 수 = " + k;
    }

    @GetMapping("/dbscan")
    public String performDBScan(@RequestParam(defaultValue = "10") double radius) {
        clusteringService.performDBScan(radius);
        return "DBSCAN 클러스터링 완료! 반경 = " + radius + "km";
    }
}