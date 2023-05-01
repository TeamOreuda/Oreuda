package com.oreuda.oreuda_plant.Service;

import com.oreuda.oreuda_plant.Domain.Dto.PlantDto;
import com.oreuda.oreuda_plant.Domain.Dto.StatusDto;
import com.oreuda.oreuda_plant.Domain.Entity.Plant;
import com.oreuda.oreuda_plant.Domain.Entity.User;
import com.oreuda.oreuda_plant.Domain.Entity.UserLog;
import com.oreuda.oreuda_plant.Repository.PlantRepository;
import com.oreuda.oreuda_plant.Repository.UserLogRepository;
import com.oreuda.oreuda_plant.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PlantService {
    private final PlantRepository plantRepository;
    private final UserRepository userRepository;
    private final UserLogRepository userLogRepository;

    public PlantDto getPlant(String userId) {
//        log.info("userId = {}", userId);
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        List<Plant> plants= plantRepository.findAll();
        int userStats = user.getStats();
        for (Plant plant : plants) {
            if (plant.getMin() <= userStats && userStats <= plant.getMax()) {
                return PlantDto.builder()
                        .id(plant.getId())
                        .name(plant.getName())
                        .build();
            }
        }
        return null;
    }

    public List<StatusDto> getStatus(String userId) {
        List<UserLog> userLogs = userLogRepository.findAllByUserId(userId);
        List<StatusDto> statusDtoList = new ArrayList<>();
        for (UserLog userLog : userLogs) {
            statusDtoList.add(StatusDto.builder()
                    .time(userLog.getTime())
                    .val(userLog.getVal())
                    .build());
        }
        return statusDtoList;
    }
}
