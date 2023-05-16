package com.oreuda.api.domain.dto;

import java.time.LocalDateTime;

import com.oreuda.api.domain.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserDto {

	String nickname;
	int commitCnt;
	int repositoryCnt;
	int streakMax;
	String mainLanguage;
	LocalDateTime updateTime;

	public static UserDto toEntity(User user){
		return UserDto.builder()
			.nickname(user.getNickname())
			.commitCnt(user.getCommitCnt())
			.repositoryCnt(user.getRepositoryCnt())
			.streakMax(user.getStreakMax())
			.mainLanguage(user.getMostLanguage())
			.updateTime(user.getUpdateTime())
			.build();
	}
}
