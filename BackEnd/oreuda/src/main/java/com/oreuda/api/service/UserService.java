package com.oreuda.api.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.dto.SignUpDto;
import com.oreuda.api.domain.dto.UserDto;
import com.oreuda.api.domain.entity.Folder;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.repository.FolderRepository;
import com.oreuda.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final FolderRepository folderRepository;

	public void signup(SignUpDto signUpDto) {
		// 사용자
		User user = User.builder()
			.id(signUpDto.getUserId())
			.image(signUpDto.getImage())
			.joinDate(LocalDateTime.now())
			.stats(0)
			.nickname(signUpDto.getNickname())
			.commitCnt(0)
			.repositoryCnt(0)
			.streakMax(0)
			.mostLanguage("empty")
			.updateTime(LocalDateTime.now())
			.build();
		userRepository.save(user);

		// 폴더
		Folder folder = Folder.builder()
			.user(user)
			.name("기본 폴더")
			.color("white")
			.status("B")
			.order(0)
			.date(LocalDateTime.now())
			.build();
		folderRepository.save(folder);

	}

	public boolean isTodayFirstLogin(String userId) {
		User user = userRepository.findById(userId).get();
		LocalDateTime updateTime = user.getUpdateTime();
		LocalDateTime now = LocalDateTime.now();

		if (updateTime == null) {
			return true;
		}

		return updateTime.getYear() != now.getYear() || updateTime.getMonth() != now.getMonth()
			|| updateTime.getDayOfMonth() != now.getDayOfMonth();
	}

	public UserDto getUser(String userId) {
		User user = userRepository.findById(userId).get();
		UserDto userDto = UserDto.toEntity(user);

		return userDto;
	}

	public String getImage(String userId) {
		User user = userRepository.findById(userId).get();
		String userImage = user.getImage();

		return userImage;
	}

	public Long getCountUser() {
		return userRepository.count();
	}
}

