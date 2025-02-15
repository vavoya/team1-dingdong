package com.ddbb.dingdong.application.usecase.bus;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleQueryRepository;
import com.ddbb.dingdong.domain.transportation.repository.projection.BusStopLocationProjection;
import com.ddbb.dingdong.domain.transportation.service.BusErrors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetBusStopLocationUseCase implements UseCase<GetBusStopLocationUseCase.Param, GetBusStopLocationUseCase.Response> {
    private final BusScheduleQueryRepository busScheduleQueryRepository;

    @Override
    public Response execute(Param param) {
        BusStopLocationProjection busStopLocation = busScheduleQueryRepository.findBusStopLocation(param.userId, param.busScheduleId)
                .orElseThrow(BusErrors.NO_BUS_STOP::toException);
        return new Response(
                busStopLocation.getLongitude(),
                busStopLocation.getLatitude()
        );
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Long busScheduleId;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Double longitude;
        private Double latitude;
    }
}
