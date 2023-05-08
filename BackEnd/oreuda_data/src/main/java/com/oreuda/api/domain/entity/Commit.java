package com.oreuda.api.domain.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Commit {

	// 고유 해시코드
	private String id;

	// 메시지
	private String message;

	// 작성일시
	@JsonProperty("committedDate")
	private String date;

	// YYYY-MM-DDTHH:MM:SSZ to YYYY-MM-DD HH:MM:SS
	public void dateFormatter() {
		// to LocalDateTime
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
		LocalDateTime dateTime = LocalDateTime.parse( this.date, formatter);

		// to YYYY-MM-DD HH:MM:SS
		formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		this.date = dateTime.plusHours(9).format(formatter); // UTC+9
	}
}
