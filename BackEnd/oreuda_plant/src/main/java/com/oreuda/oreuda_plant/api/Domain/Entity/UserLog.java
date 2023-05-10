package com.oreuda.oreuda_plant.api.Domain.Entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLog {

    // 기본키
    @Id
    @GeneratedValue
    @Column(name = "user_log_id")
    private Long id;

    // 사용자 로그 일시
    @NotNull
    @Column(name = "user_log_time")
    private LocalDateTime time;

    // 사용자 로그 값
    @NotNull
    @Column(name = "user_log_val")
    private int val;

    // 사용자
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}

