package com.ddbb.dingdong.infrastructure.routing.util;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.infrastructure.routing.model.Coordinate;
import com.ddbb.dingdong.infrastructure.routing.model.dto.RequestRouteOptimizationDTO;
import com.ddbb.dingdong.infrastructure.routing.model.dto.RequestRouteOptimizationDTO.ViaPoint;
import com.ddbb.dingdong.infrastructure.routing.model.dto.ResponseRouteOptimizationDTO;
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
import java.util.*;

import static com.ddbb.dingdong.infrastructure.routing.model.dto.ResponseRouteOptimizationDTO.Feature;
import static com.ddbb.dingdong.infrastructure.routing.model.dto.ResponseRouteOptimizationDTO.Feature.Geometry.GeometryType.LINE_STRING;
import static com.ddbb.dingdong.infrastructure.routing.model.dto.ResponseRouteOptimizationDTO.Feature.Geometry.GeometryType.POINT;

@Component
@Primary
@RequiredArgsConstructor
public class TmapRouteOptimizationDTOConverter {

    private static final String DATE_FORMAT = "yyyyMMddHHmmss";
    private static final Double BUS_DISTANCE = 0.02;
    private final HaversineDistanceFunction haversine;

    public RequestRouteOptimizationDTO fromLocations(List<Location> locations, Double schoolLatitude, Double schoolLongitude, Direction direction) {
        String startX, startY, endX, endY;
        List<ViaPoint> viaPoints = new ArrayList<>();
        for (Location location : locations) {
            viaPoints.add(
                    new ViaPoint(
                            location.getId().toString(),
                            Double.toString(location.getLongitude()),
                            Double.toString(location.getLatitude())
                    )
            );
        }
        Optional<ViaPoint> farthestPoint = viaPoints.stream().max((o1, o2) -> {
            double[] point1 = {Double.parseDouble(o1.getViaY()), Double.parseDouble(o1.getViaX())};
            double[] point2 = {Double.parseDouble(o2.getViaY()), Double.parseDouble(o2.getViaX())};
            double[] endPoint = {schoolLatitude, schoolLongitude};

            double point1Distance = haversine.distance(point1, endPoint);
            double point2Distance = haversine.distance(point2, endPoint);

            return Double.compare(point1Distance, point2Distance);

        });

        if(direction.equals(Direction.TO_SCHOOL)) {
            startX = String.valueOf((Double.parseDouble(farthestPoint.get().getViaX()) + BUS_DISTANCE));
            startY = String.valueOf((Double.parseDouble(farthestPoint.get().getViaY()) + BUS_DISTANCE));
            endX = schoolLongitude.toString();
            endY = schoolLatitude.toString();
        } else {
            startX = schoolLongitude.toString();
            startY = schoolLatitude.toString();
            endX = String.valueOf((Double.parseDouble(farthestPoint.get().getViaX()) + BUS_DISTANCE));
            endY = String.valueOf((Double.parseDouble(farthestPoint.get().getViaY()) + BUS_DISTANCE));
        }



        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
        RequestRouteOptimizationDTO request = new RequestRouteOptimizationDTO(
                startX,
                startY,
                formatter.format(LocalDateTime.now()),
                endX,
                endY,
                viaPoints);
        return request;
    }

    public Path toPath(List<Location> locations, ResponseRouteOptimizationDTO response , LocalDateTime dingdongTime, Direction direction) {
        Path path = new Path();
        LocalDateTime now = LocalDateTime.now();

        List<Point> points;
        List<Line> lines = new ArrayList<>();
        List<BusStop> busStops = new ArrayList<>();


        int lineSequence = 0;
        int busStopSequence = 0;
        List<Feature> features = response.getFeatures();
        List<Long> locationIds = new ArrayList<>();
        List<Coordinate> lastCoordinates = new ArrayList<>();
        List<Duration> timeDifferences = new ArrayList<>();
        Feature.Geometry.GeometryType prevType = null;
        LocalDateTime prevArrivalTime = null;
        boolean duplicateBusStop = false;
        int duplicateCount = 0;
        for (int i = 0 ; i < features.size() ; i++) {
            Feature feature = features.get(i);
            Feature.Geometry geometry = feature.getGeometry();
            List<Coordinate> coordinates = geometry.getCoordinates();

            if (geometry.getType().equals(POINT)) {
                String viaPointId = feature.getProperties().getViaPointId();
                if(!viaPointId.isEmpty()) {
                    locationIds.add(Long.parseLong(viaPointId));
                }
                LocalDateTime arrivalTime = LocalDateTime.parse(
                        feature.getProperties().getArriveTime(),
                        DateTimeFormatter.ofPattern(DATE_FORMAT));

                if (prevArrivalTime != null){
                    timeDifferences.add(Duration.between(prevArrivalTime, arrivalTime));
                }
                prevArrivalTime = arrivalTime;

                //똑같은 location일땐 -> 이전 busStop의 위도경도를 넣음
                if(i != 1 && POINT.equals(prevType)) {
                    duplicateCount++;
                }
            }
            prevType = geometry.getType();

            if (geometry.getType().equals(LINE_STRING)) {
                points = new ArrayList<>();
                int pointSequence = 0;
                Line line = new Line();
                line.setSequence(lineSequence++);
                line.setTotalMeters(Integer.parseInt(feature.getProperties().getDistance()));
                line.setTotalSeconds(Integer.parseInt(feature.getProperties().getTime()));
                line.setPoints(points);
                line.setPath(path);
                for (Coordinate coordinate : coordinates) {
                    List<Double> coordinateArray = coordinate.doubleArrayValue;
                    points.add(new Point(
                            null,
                            pointSequence++,
                            coordinateArray.get(1),
                            coordinateArray.get(0),
                            line
                    ));
                }
                lines.add(line);

                lastCoordinates = coordinates;
                busStops.add(new BusStop(
                            null,
                            null,
                            busStopSequence++,
                            coordinates.get(0).doubleArrayValue.get(1),
                            coordinates.get(0).doubleArrayValue.get(0),
                            null,
                            null,
                            path
                ));
                while(duplicateCount > 0) {
                    busStops.add(new BusStop(
                            null,
                            null,
                            busStopSequence++,
                            coordinates.get(0).doubleArrayValue.get(1),
                            coordinates.get(0).doubleArrayValue.get(0),
                            null,
                            null,
                            path
                    ));
                    duplicateCount--;
                }
            }
        }

        Map<Long, String> locationRoadNames = new HashMap<>();
        for(Location location : locations) {
            locationRoadNames.put(location.getId(), location.getStationName());
        }

        for(int i = 1 ; i < busStops.size(); i++) {
            BusStop busStop = busStops.get(i);
            busStop.setLocationId(locationIds.get(i - 1));
            busStop.setRoadNameAddress(locationRoadNames.get(busStop.getLocationId()));
        }
        BusStop lastBusStop = new BusStop();
        lastBusStop.setLatitude(lastCoordinates.get(lastCoordinates.size() - 1).doubleArrayValue.get(1));
        lastBusStop.setLongitude(lastCoordinates.get(lastCoordinates.size() - 1).doubleArrayValue.get(0));
        lastBusStop.setExpectedArrivalTime(dingdongTime);
        lastBusStop.setSequence(busStopSequence);
        lastBusStop.setPath(path);
        busStops.add(lastBusStop);
        if(direction.equals(Direction.TO_SCHOOL)) {
            for (int i = busStops.size() - 2 ; i >= 0; i--) {
                BusStop prevBusStop = busStops.get(i + 1);
                BusStop busStop = busStops.get(i);
                LocalDateTime expectedArrivalTime = prevBusStop.getExpectedArrivalTime().minus(timeDifferences.get(i));
                busStop.setExpectedArrivalTime(expectedArrivalTime);
            }
        } else {
            busStops.get(0).setExpectedArrivalTime(dingdongTime);
            for (int i = 1 ; i < busStops.size(); i++) {
                BusStop prevBusStop = busStops.get(i - 1);
                BusStop busStop = busStops.get(i);
                LocalDateTime expectedArrivalTime = prevBusStop.getExpectedArrivalTime().plus(timeDifferences.get(i - 1));
                busStop.setExpectedArrivalTime(expectedArrivalTime);
            }
        }

        path.setTotalMeter(Double.parseDouble(response.getProperties().getTotalDistance()));
        path.setTotalSeconds(Integer.parseInt(response.getProperties().getTotalTime()));
        path.setLines(lines);
        path.setBusStop(busStops);
        return path;
    }
}
