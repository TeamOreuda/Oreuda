package com.oreuda.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oreuda.api.domain.dto.FolderDto;
import com.oreuda.api.domain.dto.InputFolderDto;
import com.oreuda.api.service.FolderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/folder")
@RequiredArgsConstructor
public class FolderController {

	private final FolderService folderService;

	/**
	 * 폴더 목록 조회
	 * @param userId
	 * @return
	 */
	@GetMapping
	public ResponseEntity<List<FolderDto>> getFolders(@RequestHeader String userId) {
		return new ResponseEntity<>(folderService.getFolders(userId), HttpStatus.OK);
	}

	/**
	 * 폴더 추가
	 * @param userId
	 * @param inputFolderDto
	 * @return
	 */
	@PostMapping
	public ResponseEntity<?> addFolder(@RequestHeader String userId, @RequestBody InputFolderDto inputFolderDto) {
		folderService.addFolder(userId, inputFolderDto);
		return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 폴더 삭제
	 * @param userId
	 * @param folders
	 * @return
	 */
	@PatchMapping("delete")
	public ResponseEntity<?> deleteFolder(@RequestHeader String userId, @RequestBody List<Integer> folders) {
		folderService.deleteFolder(userId, folders);
		return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 폴더 수정
	 * @param userId
	 * @param folderDto
	 * @return
	 */
	@PatchMapping
	public ResponseEntity<?> updateFolder(@RequestHeader String userId, @RequestBody FolderDto folderDto) {
		folderService.updateFolder(userId, folderDto);
		return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 폴더 순서 변경
	 * @param userId
	 * @param folderDto
	 * @return
	 */
	@PatchMapping("rearrange")
	public ResponseEntity<List<FolderDto>> rearrangeFolder(@RequestHeader String userId, @RequestBody FolderDto folderDto) {
		return new ResponseEntity(folderService.rearrangeFolder(userId, folderDto), HttpStatus.OK);
	}
}
