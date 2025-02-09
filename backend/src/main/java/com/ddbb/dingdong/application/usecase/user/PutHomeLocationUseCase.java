package com.ddbb.dingdong.application.usecase.user;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.user.repository.HomeQueryRepository;
import com.ddbb.dingdong.domain.user.service.HomeErrors;
import com.ddbb.dingdong.domain.user.service.UserErrors;
import com.ddbb.dingdong.presentation.endpoint.user.home.UpdateHomeLocationDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PutHomeLocationUseCase implements UseCase<PutHomeLocationUseCase.Param, PutHomeLocationUseCase.Result> {
    private final HomeQueryRepository homeQueryRepository;

    @Override
    @Transactional
    public Result execute(Param param) {
        param.validate();
        Long userId = param.getUserId();
        UpdateHomeLocationDto dto = param.getDto();
        Double homeLatitude = dto.getHouseLatitude();
        Double homeLongitude = dto.getHouseLongitude();
        Double stationLatitude = dto.getStationLatitude();
        Double stationLongitude = dto.getStationLongitude();
        String stationName = dto.getStationName();

        int isUpdated = homeQueryRepository.updateHomeLocationByUserId(userId, homeLatitude, homeLongitude, stationLatitude, stationLongitude, stationName);
        if (isUpdated == 0) {
            throw UserErrors.NOT_FOUND.toException();
        }

        return new Result(
                new Result.HouseInfo(homeLatitude, homeLongitude),
                new Result.StationInfo(stationName, stationLatitude, stationLongitude)
        );
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private UpdateHomeLocationDto dto;

        @Override
        public boolean validate() {
            Double houseLatitude = dto.getHouseLatitude();
            Double houseLongitude = dto.getHouseLongitude();
            Double stationLatitude = dto.getStationLatitude();
            Double stationLongitude = dto.getStationLongitude();
            String stationName = dto.getStationName();

            if (userId == null || userId <= 0) {
                throw UserErrors.NOT_FOUND.toException();
            } else if (houseLatitude == null || houseLatitude < -90.0 || houseLatitude > 90.0) {
                throw HomeErrors.INVALID_HOME_LATITUDE_RANGE.toException();
            } else if (houseLongitude == null || houseLongitude < -180.0 || houseLongitude > 180.0) {
                throw HomeErrors.INVALID_HOME_LONGITUDE_RANGE.toException();
            } else if (stationLatitude != null && (stationLatitude < -90.0 || stationLatitude > 90.0)) {
                throw HomeErrors.INVALID_STATION_LATITUDE_RANGE.toException();
            } else if (stationLongitude != null && (stationLongitude < -180.0 || stationLongitude > 180.0)) {
                throw HomeErrors.INVALID_STATION_LONGITUDE_RANGE.toException();
            } else if (stationName != null && stationName.isEmpty()) {
                throw HomeErrors.REQUIRED_STATION_NAME.toException();
            }
            return true;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        private HouseInfo houseInfo;
        private StationInfo stationInfo;

        @Getter
        @AllArgsConstructor
        public static class HouseInfo {
            private Double latitude;
            private Double longitude;
        }
        @Getter
        @AllArgsConstructor
        public static class StationInfo {
            private String name;
            private Double latitude;
            private Double longitude;
        }
    }
}
