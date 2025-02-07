package com.ddbb.dingdong.domain.clustering.util;

import com.ddbb.dingdong.domain.clustering.entity.Location;

import java.util.ArrayList;
import java.util.List;

public class ClusteringUtil {
    public static List<List<Location>> generateClusters(List<Location> locations) {
        List<List<Location>> clusters = new ArrayList<>();

        for (int i = 0; i < locations.size(); i++) {
            int nowLabel = locations.get(i).getClusterLabel();
            if (nowLabel == -1) continue;
            int start = i;
            int end = i;
            for (int j = i + 1; j < locations.size(); j++) {
                int nextLabel = locations.get(j).getClusterLabel();
                if (nowLabel != nextLabel) break;
                end = j;
            }
            i = end;
            if (end - start >= 15) continue;
            clusters.add(locations.subList(start, end + 1));
        }
        return clusters;
    }
}
