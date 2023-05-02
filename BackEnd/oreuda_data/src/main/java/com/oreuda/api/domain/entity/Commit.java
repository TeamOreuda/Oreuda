package com.oreuda.api.domain.entity;

import java.time.LocalDate;
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

	// YYYY-MM-DDTHH:MM:SSZ to YYYY-MM-DD
	public void dateFormatter() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
		LocalDateTime dateTime = LocalDateTime.parse( this.date, formatter);
		// UTC+9
		LocalDate date = dateTime.plusHours(9).toLocalDate();

		this.date = date.toString().split("T")[0];
	}
}
