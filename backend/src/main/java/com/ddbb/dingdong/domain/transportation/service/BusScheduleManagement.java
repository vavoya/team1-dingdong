package com.ddbb.dingdong.domain.transportation.service;

import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.domain.transportation.entity.Bus;
import com.ddbb.dingdong.domain.transportation.entity.BusSchedule;
import com.ddbb.dingdong.domain.transportation.entity.Path;
import com.ddbb.dingdong.domain.transportation.entity.vo.OperationStatus;
import com.ddbb.dingdong.domain.transportation.repository.BusScheduleRepository;
import com.ddbb.dingdong.domain.transportation.service.dto.BusStopTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.ddbb.dingdong.domain.transportation.service.BusErrors.BUS_UPDATE_ERROR;

@Service
@RequiredArgsConstructor
public class BusScheduleManagement {
    private final BusScheduleRepository busScheduleRepository;

    public BusSchedule allocateBusSchedule(Path path, Long schoolId, Direction direction, LocalDateTime dingdongTime, LocalDate startDate, int reservationCount) {
        BusSchedule busSchedule = new BusSchedule();
        busSchedule.setPath(path);
        busSchedule.setSchoolId(schoolId);
        //TODO 버스할당 ->추후 수정
        busSchedule.setBus(new Bus("버스 01"));
        if(direction.equals(Direction.TO_SCHOOL)) {
            busSchedule.setArrivalTime(dingdongTime);
        } else {
            busSchedule.setDepartureTime(dingdongTime);
        }
        int remainingSeats = 15 - reservationCount;
        if(remainingSeats < 0) {
            throw BusErrors.NO_SEATS.toException();
        }

        busSchedule.setRemainingSeats(remainingSeats);
        busSchedule.setStartDate(startDate);
        busSchedule.setStatus(OperationStatus.READY);
        busSchedule.setDirection(direction);
        path.setBusSchedule(busSchedule);
        return busScheduleRepository.save(busSchedule);
    }

    public List<BusStopTime> adjustBusStopTimes(LocalDateTime now, List<BusStopTime> busStopTimes) {
        List<BusStopTime> adjustedBusStopTimes = new ArrayList<>();
        if (busStopTimes == null || busStopTimes.isEmpty()) {
            return adjustedBusStopTimes;
        }
        BusStopTime head = busStopTimes.get(0);
        LocalDateTime updateTime = now;
        LocalDateTime prevTime = head.getTime();

        adjustedBusStopTimes.add(new BusStopTime(head.getBusStopId(), updateTime));

        for (int i = 1; i < busStopTimes.size(); i++) {
            BusStopTime item = busStopTimes.get(i);

            long intervalSecond = ChronoUnit.SECONDS.between(prevTime, item.getTime());
            updateTime = updateTime.plusSeconds(intervalSecond);
            adjustedBusStopTimes.add(new BusStopTime(item.getBusStopId(), updateTime));
            prevTime = item.getTime();
        }
        return adjustedBusStopTimes;
    }

    // TODO:: bulk update
    @Transactional
    public void updateBusStopTimes(List<BusStopTime> busStopTimes, List<BusStopTime> oldBusStopTimes) {
        for (int i = 0; i < busStopTimes.size(); i++) {
            BusStopTime oldBusStopTime = oldBusStopTimes.get(i);
            BusStopTime newBusStopTime = busStopTimes.get(i);
            if (!oldBusStopTime.equals(newBusStopTime)) {
                int res = busScheduleRepository.updateBusStopArrivalTime(newBusStopTime.getTime(), newBusStopTime.getBusStopId());
                if (res == 0) {
                    throw BUS_UPDATE_ERROR.toException();
                }
            }
        }
    }
}
