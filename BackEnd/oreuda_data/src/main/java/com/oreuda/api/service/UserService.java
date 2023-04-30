package com.oreuda.api.service;

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
		System.out.println("here");
		User user = userJpaRepository.findById(userId).orElseThrow(NotFoundException::new);

		System.out.println("user");
		System.out.println(user);

		int repoCnt = userRepository.getSize(userId).intValue();
		System.out.println("repo cnt : " + repoCnt);

		List<Commit> commits = commitRepository.getList(userId);
		System.out.println("cmt cnt : " + commits.size());

		user.updateGitHubData(repoCnt, commits.size(), 0);

		userJpaRepository.save(user);
	}
}
