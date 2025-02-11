package com.ddbb.dingdong.domain.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = null;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(cascade = CascadeType.MERGE ,fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;

    @OneToOne(cascade = CascadeType.ALL)
    private Home home;

    public void associateHome(Home home) {
        this.home = home;
    }

    public void updateHome(Double stationLatitude, Double stationLongitude, String stationName) {
        this.home.setStationLatitude(stationLatitude);
        this.home.setStationLongitude(stationLongitude);
        this.home.setStationName(stationName);
    }
}
