package com.oreuda.oreuda_plant.api.Domain.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USER")
public class User {

    // 기본키
    @Id
    @Column(name = "user_id", length = 36)
    private String id;

    // 사용자 프로필 이미지
    @NotNull
    @Column(name = "user_image")
    private String image;

    // 사용자 닉네임
    @NotNull
    @Column(name = "user_nickname")
    private String nickname;

    // 사용자 능력치
    @NotNull
    @Column(name = "user_stats")
    private int stats;

    // 사용자 가입 일자
    @NotNull
    @Column(name = "user_join_date")
    private LocalDateTime joinDate;

    // 사용자 총 커밋 수
    @NotNull
    @Column(name = "user_commit_cnt")
    private int commitCnt;

    // 사용자 레포지토리 수
    @NotNull
    @Column(name = "user_repository_cnt")
    private int repositoryCnt;

    // 사용자 연속 스트릭 수
    @NotNull
    @Column(name = "user_streak_max")
    private int streakMax;

    // 사용자 주언어
    @NotNull
    @Column(name = "user_most_language")
    private String mostLanguage;

    // 사용자 업데이트 시간
    @NotNull
    @Column(name = "user_update_time")
    private LocalDateTime updateTime;
}

