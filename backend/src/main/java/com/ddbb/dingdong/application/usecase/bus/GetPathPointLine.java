package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


public class GetPathPointLine implements UseCase<GetPathPointLine.Param, GetPathPointLine.Response> {

    @Override
    public Response execute(Param param) {
        return null;
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
