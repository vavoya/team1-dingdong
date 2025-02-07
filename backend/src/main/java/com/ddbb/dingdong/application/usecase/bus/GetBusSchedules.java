package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class GetBusSchedules implements UseCase<GetBusSchedules.Param, GetBusSchedules.Response> {
    @Override
    public Response execute(Param param) {
        return null;
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Direction direction;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private List<LocalDateTime> schedules;
    }
}
