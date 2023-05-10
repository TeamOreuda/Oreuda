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
import java.time.LocalDate;
import java.time.LocalDateTime;
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
        List<UserLog> userLogs = userLogRepository.findAllByUserIdOrderByTime(userId);
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

    public int getDailyPoint(int commitCnt, int day, int streak) {
//        log.info("commitCnt = {}, day = {}, streak = {}", commitCnt, day, streak);
        // decay = 0.9748 ^ day
        final double DECAY_RATE = 0.9748;
        // streakBonus = 300 * (1 - 0.905 ^ (streak - 1))
        final double STREAK_BONUS_RATE = 0.905;
        // 첫 커밋 50, 이후 20, 최대 250
        int point = Math.min(75 + (commitCnt - 1) * 25, 250);
        double decay = Math.pow(DECAY_RATE, day);
        // 66일간 유지되면 300점 보너스 이후 고정
        int streakBonus = (int) Math.round(200 * (1 - Math.pow(STREAK_BONUS_RATE, streak - 1)));
//        log.info("point = {}, decay = {}, streakBonus = {}", point, decay, streakBonus);
        int result = (int) Math.round((point + streakBonus) * decay);
//        log.info("result = {}", result);
        return result;
    }

    public int getPoint(LocalDate start, Map<String, Integer> userCommits) {
        int point = 0;
        int streak = 1;

        LocalDate prev = null;
        for (String key : userCommits.keySet()) {
            LocalDate date = LocalDate.parse(key);
            if (date.isAfter(start)) break;
            // streak 계산
            if (prev != null && prev.plusDays(1).isEqual(date)) {
                // 연속된 경우
                streak++;
            } else {
                // 연속되지 않은 경우
                streak = 1;
            }
            // 며칠전 커밋인지 계산
            Period period = Period.between(date, start);
            int day = period.getYears() * 365 + period.getMonths() * 30 + period.getDays();
            // 6달 이상은 무조건 0점이므로 계산할 필요 없음
            if (day > 180) continue;
            // 점수 계산
            point += getDailyPoint(userCommits.get(key), day, streak);
            prev = date;
        }
        return point;
    }

    public void setStatus(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        UserLog userLog = userLogRepository.findTopByUserIdOrderByTimeDesc(userId).orElse(null);
        if (userLog == null) {
            LocalDateTime startTime = user.getJoinDate().minusMonths(1).withHour(0).withMinute(0).withSecond(0);
            userLog = UserLog.builder()
                    .user(user)
                    .time(startTime)
                    .val(0)
                    .build();
        }
        LocalDate today = LocalDate.now();
        Map<String, Integer> userCommits = commitRepository.getList(userId, userLog.getTime().minusMonths(6).toLocalDate());
        // 현재 포인트 저장
        user.setStats(getPoint(today, userCommits));
//        log.info("{}: {}", user.getNickname(), user.getStats());
        userRepository.save(user);
        // 그래프 채우기
        while (userLog.getTime().toLocalDate().isBefore(today)) {
            userLog = UserLog.builder()
                    .user(user)
                    .time(userLog.getTime().plusDays(1))
                    .val(getPoint(userLog.getTime().toLocalDate(), userCommits))
                    .build();
//            log.info("{}: {}", userLog.getTime(), userLog.getVal());
            userLogRepository.save(userLog);
        }
    }
}
