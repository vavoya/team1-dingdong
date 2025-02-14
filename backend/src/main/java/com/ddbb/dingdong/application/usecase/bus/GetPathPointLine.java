package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.transportation.repository.PathQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.projection.PathPointProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetPathPointLine implements UseCase<GetPathPointLine.Param, GetPathPointLine.Response> {
    private final PathQueryRepository pathQueryRepository;

    @Override
    public Response execute(Param param) {
        List<PathPointProjection> projections = pathQueryRepository.findPathPointsByPathId(param.busScheduleId);
        List<Response.Point> points = projections.stream()
                .map(proj -> new Response.Point(proj.getLongitude(), proj.getLatitude()))
                .toList();
        return new Response(points);
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long busScheduleId;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response {
        private List<Point> points;

        @Getter
        @AllArgsConstructor
        public static class Point {
            double longitude;
            double latitude;
        }
    }
}
