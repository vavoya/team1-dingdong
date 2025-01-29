package com.ddbb.dingdong;

import com.ddbb.dingdong.domain.clustering.entity.Location;
import com.ddbb.dingdong.domain.clustering.repository.LocationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DingdongApplication {

	public static void main(String[] args) {
		SpringApplication.run(DingdongApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedData(LocationRepository locationRepository) {
		return args -> {
			locationRepository.deleteAll();
			if (locationRepository.count() == 0) {
				int count = 0;
				while (count < 500) {
					double randomLat = getRandomNumber(37.1, 37.9);   // 경기도 대략 범위(북동-남서로 넉넉히)
					double randomLon = getRandomNumber(126.6, 127.8);

					// 서울 대략 범위를 제외
					if (!isInSeoulArea(randomLat, randomLon)) {
						Location loc = new Location(
								"RandomLoc_" + (count + 1),
								randomLat,
								randomLon
						);
						locationRepository.save(loc);
						count++;
					}
				}
			}
		};
	}

	private double getRandomNumber(double min, double max) {
		return Math.random() * (max - min) + min;
	}

	private boolean isInSeoulArea(double lat, double lon) {
		// 서울 제외
		return (lat >= 37.4133 && lat <= 37.7151
				&& lon >= 126.7341 && lon <= 127.2693);
	}
}
