package com.oreuda.oreuda_plant.api.Service;

import com.oreuda.oreuda_plant.api.Domain.Dto.PlantDto;
import com.oreuda.oreuda_plant.api.Domain.Dto.StatusDto;
import com.oreuda.oreuda_plant.api.Domain.Entity.Plant;
import com.oreuda.oreuda_plant.api.Domain.Entity.User;
import com.oreuda.oreuda_plant.api.Domain.Entity.UserLog;
import com.oreuda.oreuda_plant.api.Repository.CommitRepository;
import com.oreuda.oreuda_plant.api.Repository.PlantRepository;
import com.oreuda.oreuda_plant.api.Repository.UserLogRepository;
import com.oreuda.oreuda_plant.api.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@ToString
@RequiredArgsConstructor
public class PlantService {
    private final PlantRepository plantRepository;
    private final UserRepository userRepository;
    private final UserLogRepository userLogRepository;
    private final CommitRepository commitRepository;

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
        List<UserLog> userLogs = userLogRepository.findAllByUserIdOrderByTimeDesc(userId);
        List<StatusDto> statusDtoList = new ArrayList<>();
        for (UserLog userLog : userLogs) {
            statusDtoList.add(StatusDto.builder()
                    .id(userLog.getId())
                    .time(userLog.getTime())
                    .val(userLog.getVal())
                    .build());
        }
        return statusDtoList;
    }

    public long getDailyPoint(int commitCnt, int day, int streak) {
        log.info("commitCnt = {}, day = {}, streak = {}", commitCnt, day, streak);
        final double DECAY_RATE = 0.95;
        int point = Math.min(5 + (commitCnt - 1) * 2, 20);
        double decay = Math.pow(DECAY_RATE, day);
        double streakBonus = Math.log(streak) / Math.log(2);
        log.info("point = {}, decay = {}, streakBonus = {}", point, decay, streakBonus);
        return Math.round(point * decay + streakBonus);
    }

    public int getPoint(LocalDate joinDate, LocalDate start, Map<String, Integer> userCommits) {
        int point = 0;
        int streak = 1;

        LocalDate prev = null;
        for (String key : userCommits.keySet()) {
            LocalDate date = LocalDate.parse(key);
            if (date.isAfter(start)) continue;
            if (date.isEqual(joinDate)) break;
            if (prev != null && prev.minusDays(1).isEqual(date)) {
                streak++;
            } else {
                streak = 1;
            }
            Period period = Period.between(date, start);
            int day = period.getYears() * 365 + period.getMonths() * 30 + period.getDays();
            point += getDailyPoint(userCommits.get(key), day, streak);
            prev = date;
        }
        return point;
    }

    public void setStatus(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        UserLog userLog = userLogRepository.findTopByUserIdOrderByTimeDesc(userId).orElseThrow(() -> new IllegalArgumentException("해당 유저의 로그가 없습니다."));
        LocalDate today = LocalDate.now();
        Map<String, Integer> userCommits = commitRepository.getList(userId, user.getJoinDate());
        userLog = UserLog.builder()
                .user(user)
                .time(userLog.getTime().plusDays(1))
                .val(getPoint(user.getJoinDate(), today, userCommits))
                .build();
        log.info("userLog = {}", userLog.getVal());
//        while (userLog.getTime().toLocalDate().isBefore(today)) {
//            userLog = UserLog.builder()
//                    .user(user)
//                    .time(userLog.getTime().plusDays(1))
//                    .val(getPoint(user.getJoinDate(), userLog.getTime().toLocalDate(), userCommits))
//                    .build();
//            log.info("userLog = {}", userLog.getVal());
////            userLogRepository.save(userLog);
//        }
    }
}
