package com.oreuda.api.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

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

	public void updateUser(String userId) {
		User user = userJpaRepository.findById(userId).orElseThrow(NotFoundException::new);

		// 사용자 Repository 수
		int repoCnt = userRepository.getSize(userId).intValue();
		// 사용자 Commit 정보
		List<Commit> commits = commitRepository.getList(userId);

		user.updateGitHubData(repoCnt, commits.size(), streakMax(commits), LocalDateTime.now());
		userJpaRepository.save(user);
	}

	private int streakMax(List<Commit> commits) {
		int streakMax = 0;

		Collections.sort(commits, (o1, o2) -> o1.getDate().compareTo(o2.getDate()));

		return streakMax;
	}
}
