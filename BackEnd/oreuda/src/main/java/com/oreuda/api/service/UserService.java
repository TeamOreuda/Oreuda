package com.oreuda.api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oreuda.api.domain.dto.SignUpDto;
import com.oreuda.api.domain.dto.UserDto;
import com.oreuda.api.domain.entity.Folder;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.domain.entity.UserLog;
import com.oreuda.api.repository.FolderRepository;
import com.oreuda.api.repository.UserLogRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.client.DataClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final UserLogRepository userLogRepository;
	private final FolderRepository folderRepository;
	private final DataClient dataClient;

	public void signup(SignUpDto signUpDto) {
		// 사용자
		User user = User.builder()
			.id(signUpDto.getUserId())
			.image(signUpDto.getImage())
			.joinDate(LocalDate.now())
			.stats(0)
			.nickname(signUpDto.getNickname())
			.commitCnt(0)
			.repositoryCnt(0)
			.streakMax(0)
			.mostLanguage("empty")
			.updateTime(LocalDateTime.now())
			.build();
		userRepository.save(user);

		// 깃 api
		// 닉네임, 총 커밋수, 레포수, 연속 스트릭, 주언어, 업데이트 시간
//		dataClient.setData(user.getId());
		
		// 로그
		UserLog userLog = UserLog.builder()
			.user(user)
			.time(LocalDateTime.now())
			.val(user.getStats())
			.build();
		userLogRepository.save(userLog);

		// 폴더
		Folder folder = Folder.builder()
			.user(user)
			.name("미분류")
			.color("black")
			.status("V")
			.order(0)
			.date(LocalDateTime.now())
			.build();
		folderRepository.save(folder);
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
}

