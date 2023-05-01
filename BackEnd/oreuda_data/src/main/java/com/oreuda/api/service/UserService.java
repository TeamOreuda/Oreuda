package com.oreuda.api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.oreuda.api.domain.entity.Commit;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.repository.CommitRepository;
import com.oreuda.api.repository.UserJpaRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserJpaRepository userJpaRepository;
	private final UserRepository userRepository;
	private final CommitRepository commitRepository;

	private final RedisTemplate redisTemplate;

	public void updateUser(String userId) {
		User user = userJpaRepository.findById(userId).orElseThrow(NotFoundException::new);

		// 사용자 Repository 수
		int repoCnt = userRepository.getSize(userId).intValue();
		// 사용자 Commit 정보
		List<Commit> commits = commitRepository.getList(userId);

		user.updateGitHubData(repoCnt, commits.size(), countStreak(commits), LocalDateTime.now());
		userJpaRepository.save(user);
	}

	/**
	 * 사용자의 최대 연속 스트릭 수 구하기
	 * @param commits
	 * @return
	 */
	private int countStreak(List<Commit> commits) {
		Collections.sort(commits, (o1, o2) -> o1.getDate().compareTo(o2.getDate()));

		int streakCnt = 1, maxStreakCnt = 0;
		LocalDate preDate = LocalDate.parse(commits.remove(0).getDate(), DateTimeFormatter.ISO_DATE);

		for (Commit commit : commits) {
			LocalDate nowDate = LocalDate.parse(commit.getDate(), DateTimeFormatter.ISO_DATE);

			if(preDate.isEqual(nowDate)) continue;

			if (preDate.plusDays(1).isEqual(nowDate)) {
				// 하루 연속이면 카운팅
				streakCnt++;
			} else {
				// 연속이 아니면 최대값 비교
				maxStreakCnt = Math.max(maxStreakCnt, streakCnt);
				streakCnt = 1;
			}

			preDate = nowDate;
		}

		return maxStreakCnt;
	}
}
