package com.ddbb.dingdong.presentation.endpoint.admin;

import com.ddbb.dingdong.application.exception.APIException;
import com.ddbb.dingdong.application.usecase.clustering.ClusterLocationsUseCase;
import com.ddbb.dingdong.application.usecase.routing.CreateRouteUseCase;
import com.ddbb.dingdong.domain.common.exception.DomainException;
import com.ddbb.dingdong.domain.reservation.entity.vo.Direction;
import com.ddbb.dingdong.infrastructure.auth.AuthUser;
import com.ddbb.dingdong.infrastructure.auth.annotation.LoginUser;
import com.ddbb.dingdong.presentation.endpoint.admin.exchanges.ClusteringRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/clusters")
public class BusClusterController {
    private final ClusterLocationsUseCase clusterLocationsUseCase;
    private final CreateRouteUseCase createRouteUseCase;

    //해당 시간대 eg.2025-02-06 12:00의 TO_HOME 으로 가는 모든 유저들을 군집으로 클러스터링한다. (cluster label 만 붙힘)
    @PostMapping
    public ResponseEntity<Void> clusterUserLocations(
            @LoginUser AuthUser admin,
            @RequestBody ClusteringRequestDTO clusteringRequestDTO
    ){
        Direction direction = clusteringRequestDTO.getDirection();
        LocalDateTime dingdongTime = clusteringRequestDTO.getDingdongTime();

        ClusterLocationsUseCase.Param param = new ClusterLocationsUseCase.Param(
               direction,
               dingdongTime
        );
        try {
            clusterLocationsUseCase.execute(param);
        } catch (DomainException ex) {
            throw new APIException(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.ok().build();
    }

    //해당 clusterId의 user Id를 찾아서, 해당 정류장 위치를 찾은 후, Tmap api를 돌려서 Path, Line, Point, Bus Stop, BusSchedule을 만들어 DB에 삽입,
    // 그후 Ticket을 만들고 각각의 Reservation의 상태값 바꾸고(배차 완료) ticket을 할당해 같이 db insert.
    @PostMapping("/{clusterLabel}/routes")
    public ResponseEntity<Void> createRoutesClusters(
            @LoginUser AuthUser admin,
            @PathVariable Long clusterLabel
    ) {
        CreateRouteUseCase.Param param = new CreateRouteUseCase.Param(
                clusterLabel
        );
        try {
            createRouteUseCase.execute(param);
        }catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().build();
    }
}
