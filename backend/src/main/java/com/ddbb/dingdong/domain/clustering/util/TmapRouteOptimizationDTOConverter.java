package com.ddbb.dingdong.domain.clustering.util;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.model.Coordinate;
import com.ddbb.dingdong.domain.clustering.model.dto.RequestRouteOptimizationDTO;
import com.ddbb.dingdong.domain.clustering.model.dto.RequestRouteOptimizationDTO.ViaPoint;
import com.ddbb.dingdong.domain.clustering.model.dto.ResponseRouteOptimizationDTO;
import com.ddbb.dingdong.domain.transportation.entity.BusStop;
import com.ddbb.dingdong.domain.transportation.entity.Line;
import com.ddbb.dingdong.domain.transportation.entity.Path;
import com.ddbb.dingdong.domain.transportation.entity.Point;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ddbb.dingdong.domain.clustering.model.dto.ResponseRouteOptimizationDTO.Feature;
import static com.ddbb.dingdong.domain.clustering.model.dto.ResponseRouteOptimizationDTO.Feature.Geometry.GeometryType.LINE_STRING;

@Component
@Primary
@RequiredArgsConstructor
public class TmapRouteOptimizationDTOConverter implements RouteOptimizationDTOConverter<RequestRouteOptimizationDTO, ResponseRouteOptimizationDTO> {

    private static final String DATE_FORMAT = "yyyyMMddHHmmss";

    private final HaversineDistanceFunction haversine;

    @Override
    public RequestRouteOptimizationDTO fromLocations(List<Location> locations, Double endLatitude, Double endLongitude) {
        List<ViaPoint> viaPoints = new ArrayList<>();
        int id = 0;
        for (int i = 0; i < locations.size(); i++) {
            Location currentLocation = locations.get(i);
            viaPoints.add(
                    new ViaPoint(
                            Integer.toString(++id),
                            Double.toString(currentLocation.getLongitude()),
                            Double.toString(currentLocation.getLatitude())
                    )
            );
        }

        Optional<ViaPoint> farthestPoint = viaPoints.stream().max((o1, o2) -> {
            double[] point1 = {Double.parseDouble(o1.getViaY()), Double.parseDouble(o1.getViaX())};
            double[] point2 = {Double.parseDouble(o2.getViaY()), Double.parseDouble(o2.getViaX())};
            double[] endPoint = {endLatitude, endLongitude};

            double point1Distance = haversine.distance(point1, endPoint);
            double point2Distance = haversine.distance(point2, endPoint);

            return Double.compare(point1Distance, point2Distance);
        });

        viaPoints.remove(farthestPoint.get());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
        RequestRouteOptimizationDTO request = new RequestRouteOptimizationDTO(
                farthestPoint.get().getViaX(),
                farthestPoint.get().getViaY(),
                formatter.format(LocalDateTime.now()),
                Double.toString(endLongitude),
                Double.toString(endLatitude),
                viaPoints.subList(1, Math.min(viaPoints.size(), 20))
        );
        return request;
    }

    @Override
    public List<Path> toPaths(List<ResponseRouteOptimizationDTO> responses) {
        List<Path> paths = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        for (ResponseRouteOptimizationDTO response : responses) {
            List<Point> points;
            List<Line> lines = new ArrayList<>();
            List<BusStop> busStops = new ArrayList<>();
            long totalTime = Long.parseLong(response.getProperties().getTotalTime());
            LocalDateTime realStartTime = now.minus(Duration.ofSeconds(totalTime));
            LocalDateTime apiStartTime = LocalDateTime.parse(response.getFeatures().get(0).getProperties().getArriveTime(), DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            Duration difference = Duration.between(apiStartTime, realStartTime).abs();

            int lineSequence = 0;
            int busStopSequence = 0;
            for (Feature feature : response.getFeatures()) {
                Feature.Geometry geometry = feature.getGeometry();
                List<Coordinate> coordinates = geometry.getCoordinates();

                if (geometry.getType().equals(LINE_STRING)) {
                    points = new ArrayList<>();
                    int pointSequence = 0;
                    for (Coordinate coordinate : coordinates) {
                        List<Double> coordinateArray = coordinate.doubleArrayValue;
                        points.add(new Point(
                                null,
                                pointSequence++,
                                coordinateArray.get(1),
                                coordinateArray.get(0),
                                null
                        ));
                    }
                    lines.add(new Line(
                            null,
                            lineSequence++,
                            Integer.parseInt(feature.getProperties().getDistance()),
                            Integer.parseInt(feature.getProperties().getTime()),
                            points,
                            null
                    ));

                    LocalDateTime expectedArrivalTime = LocalDateTime.parse(
                                    feature.getProperties().getArriveTime(),
                                    DateTimeFormatter.ofPattern(DATE_FORMAT))
                            .minus(difference);

                    busStops.add(new BusStop(
                            null,
                            "I_DONT_KNOW...",
                            busStopSequence++,
                            coordinates.get(0).doubleArrayValue.get(1),
                            coordinates.get(0).doubleArrayValue.get(0),
                            expectedArrivalTime,
                            null
                    ));

                }

            }

            Path path = new Path(
                    null,
                    Double.parseDouble(response.getProperties().getTotalDistance()),
                    Integer.parseInt(response.getProperties().getTotalTime()),
                    null,
                    lines,
                    busStops
            );
            paths.add(path);
        }

        return paths;
    }
}
