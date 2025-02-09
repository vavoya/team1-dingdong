package com.ddbb.dingdong.domain.transportation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BusStop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roadNameAddress;

    @Column(nullable = false)
    private Integer sequence;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private LocalDateTime expectedArrivalTime;

    private Long locationId;

    @ManyToOne
    @JoinColumn(name = "path_id")
    private Path path;
}
