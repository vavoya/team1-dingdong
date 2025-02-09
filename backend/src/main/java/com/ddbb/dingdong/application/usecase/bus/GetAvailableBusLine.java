package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleQueryRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class GetAvailableBusLine implements UseCase<GetAvailableBusLine.Param, GetAvailableBusLine.Response> {
    private final BusScheduleQueryRepository busScheduleQueryRepository;

    @Override
    public Response execute(Param param) {
        return null;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private LocalDateTime time;
        private Direction direction;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private List<Item> result;

        @Getter
        @AllArgsConstructor
        public static class Item {
            private BusStopInfo busStop;
            private BusInfo busInfo;
        }

        @Getter
        @AllArgsConstructor
        public static class BusStopInfo {
            private String name;
            private LocalDateTime time;
            private Double longitude;
            private Double latitude;
        }

        @Getter
        @AllArgsConstructor
        public static class BusInfo {
            private String name;
            private int reservedSeat;
            private int totalSeat;
        }
    }
}
