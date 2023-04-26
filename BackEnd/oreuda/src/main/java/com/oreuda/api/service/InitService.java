package com.oreuda.api.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oreuda.api.domain.entity.Plant;
import com.oreuda.api.repository.PlantRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class InitService {

	private final PlantRepository plantRepository;

	public void initPlant(){
		Plant level_1 = Plant.builder()
			.name("흙")
			.min(0)
			.max(30)
			.build();
		plantRepository.save(level_1);

		Plant level_2 = Plant.builder()
			.name("새싹")
			.min(31)
			.max(60)
			.build();
		plantRepository.save(level_2);

		// 나무 단계
		// 열매없음, 열매 개수 1, 2, 3, 4, 5
		Plant level_3 = Plant.builder()
			.name("나무")
			.min(61)
			.max(90)
			.build();
		plantRepository.save(level_3);

		Plant level_4 = Plant.builder()
			.name("나무1")
			.min(91)
			.max(120)
			.build();
		plantRepository.save(level_4);

		Plant level_5 = Plant.builder()
			.name("나무2")
			.min(121)
			.max(150)
			.build();
		plantRepository.save(level_5);

		Plant level_6 = Plant.builder()
			.name("나무3")
			.min(151)
			.max(180)
			.build();
		plantRepository.save(level_6);

		Plant level_7 = Plant.builder()
			.name("나무4")
			.min(181)
			.max(210)
			.build();
		plantRepository.save(level_7);

		Plant level_8 = Plant.builder()
			.name("나무5")
			.min(211)
			.max(240)
			.build();
		plantRepository.save(level_8);

		Plant level_9 = Plant.builder()
			.name("산")
			.min(241)
			.max(270)
			.build();
		plantRepository.save(level_9);
	}
}
