package com.oreuda.api.domain.dto;

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

	public static UserDto toEntity(User user){
		return UserDto.builder()
			.nickname(user.getNickname())
			.commitCnt(user.getCommitCnt())
			.repositoryCnt(user.getRepositoryCnt())
			.streakMax(user.getStreakMax())
			.mainLanguage(user.getMostLanguage())
			.build();
	}
}
