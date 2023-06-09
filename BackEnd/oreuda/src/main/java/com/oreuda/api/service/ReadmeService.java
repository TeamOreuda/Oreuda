package com.oreuda.api.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.dto.RDMDto;
import com.oreuda.api.domain.dto.ReadmeDto;
import com.oreuda.api.domain.dto.TechstackDto;
import com.oreuda.api.domain.entity.Readme;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.domain.entity.readme.Boj;
import com.oreuda.api.domain.entity.readme.Contact;
import com.oreuda.api.domain.entity.readme.Gitstats;
import com.oreuda.api.domain.entity.readme.MostLanguage;
import com.oreuda.api.domain.entity.readme.Oreu;
import com.oreuda.api.domain.entity.readme.ReadmeTechstack;
import com.oreuda.api.domain.entity.readme.Techstack;
import com.oreuda.api.domain.entity.readme.Writing;
import com.oreuda.api.repository.BojRepository;
import com.oreuda.api.repository.ContactRepository;
import com.oreuda.api.repository.GitstatsRepository;
import com.oreuda.api.repository.MostLanguageRepository;
import com.oreuda.api.repository.OreuRepository;
import com.oreuda.api.repository.ReadmeRepository;
import com.oreuda.api.repository.ReadmeTechstackRepository;
import com.oreuda.api.repository.TechstackRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.api.repository.WritingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReadmeService {

	private final BojRepository bojRepository;
	private final UserRepository userRepository;
	private final OreuRepository oreuRepository;
	private final ReadmeRepository readmeRepository;
	private final ContactRepository contactRepository;
	private final WritingRepository writingRepository;
	private final GitstatsRepository gitstatsRepository;
	private final TechstackRepository techstackRepository;
	private final MostLanguageRepository mostLanguageRepository;
	private final ReadmeTechstackRepository readmeTechstackRepository;

	public void saveReadme(List<ReadmeDto> readmes, String userId) {
		// 사용자 유무 검증
		User user = userRepository.findById(userId).orElseThrow();

		// 리드미 있다면 기존 리드미 업데이트
		if(readmeRepository.findByUser_Id(userId).isPresent()){
			Readme readme = readmeRepository.findByUser_Id(userId).get();

			// 기존 리드미 요소 삭제
			deleteReadme(userId, readme.getId());
			updateReadme(readmes, user, readme);
		}
		// 없다면 새로운 리드미 생성
		else {
			Readme readme = Readme.builder()
				.user(user)
				.build();
			readmeRepository.save(readme);
			updateReadme(readmes, user, readme);
		}
	}

	public void updateReadme(List<ReadmeDto> readmes, User user, Readme readme){
		for (int i = 0; i< readmes.size(); i++) {
			switch (readmes.get(i).getReadmeType()) {
				case "BOJ":
					saveBoj(readmes.get(i), user, readme, i);
					break;

				case "GIT":
					saveGit(readmes.get(i), user, readme, i);
					break;

				case "WRITING":
					saveWriting(readmes.get(i), user, readme, i);
					break;

				case "CONTACT":
					saveContact(readmes.get(i), user, readme, i);
					break;

				case "LANGUAGE":
					saveLanguage(readmes.get(i), user, readme, i);
					break;

				case "TECH":
					saveTech(readmes.get(i), user, readme, i);
					break;

				case "PLANT":
					saveOreu(user, readme, i);
					break;
			}
		}
	}

	public void saveBoj(ReadmeDto readmeDto, User user, Readme readme, int order){
		Boj boj = Boj.builder()
			.user(user)
			.readme(readme)
			.order(order)
			.value(readmeDto.getBojValue())
			.theme(readmeDto.getBojTheme())
			.build();
		bojRepository.save(boj);
	}

	public void saveGit(ReadmeDto readmeDto, User user, Readme readme, int order){
		Gitstats gitstats = Gitstats.builder()
			.user(user)
			.readme(readme)
			.order(order)
			.theme(readmeDto.getGitTheme())
			.build();
		gitstatsRepository.save(gitstats);
	}

	public void saveWriting(ReadmeDto readmeDto, User user, Readme readme, int order){
		Writing writing = Writing.builder()
			.user(user)
			.readme(readme)
			.order(order)
			.title(readmeDto.getWritingTitle())
			.contents(readmeDto.getWritingContents())
			.build();
		writingRepository.save(writing);
	}

	public void saveContact(ReadmeDto readmeDto, User user, Readme readme, int order){
		Contact contact = Contact.builder()
			.user(user)
			.readme(readme)
			.order(order)
			.blog(readmeDto.getBlogLink())
			.mail(readmeDto.getMailLink())
			.notion(readmeDto.getNotionLink())
			.build();
		contactRepository.save(contact);
	}

	public void saveLanguage(ReadmeDto readmeDto, User user, Readme readme, int order){
		MostLanguage mostLanguage = MostLanguage.builder()
			.user(user)
			.readme(readme)
			.order(order)
			.theme(readmeDto.getLanguageTheme())
			.type(readmeDto.getLanguageType())
			.build();
		mostLanguageRepository.save(mostLanguage);
	}

	public void saveTech(ReadmeDto readmeDto, User user, Readme readme, int order) {
		ReadmeTechstack readmeTechstack = ReadmeTechstack.builder()
			.user(user)
			.readme(readme)
			.order(order)
			.title(readmeDto.getTechTitle())
			.build();
		readmeTechstackRepository.save(readmeTechstack);

		for (int i = 0; i < readmeDto.getTechStack().size(); i++) {
			Techstack techstack = Techstack.builder()
				.readmeTechstack(readmeTechstack)
				.name(readmeDto.getTechStack().get(i).getName())
				.color(readmeDto.getTechStack().get(i).getColor())
				.index(readmeDto.getTechStack().get(i).getIndex())
				.order(i)
				.build();
			techstackRepository.save(techstack);
		}
	}

	public void saveOreu(User user, Readme readme, int order){
		Oreu oreu = Oreu.builder()
			.user(user)
			.readme(readme)
			.order(order)
			.build();
		oreuRepository.save(oreu);
	}

	// 리드미 조회
	public List<RDMDto> getReadme(String userId) {
		// 사용자 유무 검증
		User user = userRepository.findById(userId).orElseThrow();

		// 리드미 유무 검증
		Long readmeId = readmeRepository.findByUser_Id(userId).orElseThrow().getId();

		// List create
		List<RDMDto> rdmDtoList = new ArrayList<>();

		// BOJ
		if(bojRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			rdmDtoList.add(getBoj(userId, readmeId));
		}

		// GIT
		if(gitstatsRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			rdmDtoList.add(getGit(userId, readmeId));
		}

		// WRITING
		if(writingRepository.findByUser_IdAndReadme_Id(userId,readmeId).size()!=0) {
			List<Writing> writings = writingRepository.findByUser_IdAndReadme_Id(userId, readmeId);
			for (Writing w:writings) {
				rdmDtoList.add(getWriting(w));
			}
		}

		// CONTACT
		if(contactRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			rdmDtoList.add(getContact(userId, readmeId));
		}

		// LANGUAGE
		if(mostLanguageRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			rdmDtoList.add(getLanguage(userId, readmeId));
		}

		// TECH
		if(readmeTechstackRepository.findByUser_IdAndReadme_Id(userId,readmeId).size()!=0) {
			List<ReadmeTechstack> readmeTechstacks = readmeTechstackRepository.findByUser_IdAndReadme_Id(userId, readmeId);
			for (ReadmeTechstack r:readmeTechstacks) {
				rdmDtoList.add(getTechstack(r));
			}
		}

		// PLANT
		if(oreuRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			rdmDtoList.add(getOreu(userId, readmeId));
		}

		// 순서 기준 정렬
		rdmDtoList.sort(Comparator.comparingInt(o -> o.getOrder()));

		return rdmDtoList;
	}

	public RDMDto getBoj(String userId, Long readmeId) {
		Boj boj = bojRepository.findByUser_IdAndReadme_Id(userId, readmeId).get();
		RDMDto rdmDto = RDMDto.builder()
			.readmeType("BOJ")
			.order(boj.getOrder())
			.bojValue(boj.getValue())
			.bojTheme(boj.getTheme())
			.build();
		return rdmDto;
	}

	public RDMDto getGit(String userId, Long readmeId) {
		Gitstats git = gitstatsRepository.findByUser_IdAndReadme_Id(userId, readmeId).get();
		RDMDto rdmDto = RDMDto.builder()
			.readmeType("GIT")
			.order(git.getOrder())
			.gitValue(userRepository.findById(userId).get().getNickname())
			.gitTheme(git.getTheme())
			.build();
		return rdmDto;
	}

	public RDMDto getWriting(Writing writing) {

		RDMDto rdmDto = RDMDto.builder()
			.readmeType("WRITING")
			.order(writing.getOrder())
			.writingTitle(writing.getTitle())
			.writingContents(writing.getContents())
			.build();
		return rdmDto;
	}

	public RDMDto getContact(String userId, Long readmeId) {
		Contact contact = contactRepository.findByUser_IdAndReadme_Id(userId, readmeId).get();
		RDMDto rdmDto = RDMDto.builder()
			.readmeType("CONTACT")
			.order(contact.getOrder())
			.blogLink(contact.getBlog())
			.mailLink(contact.getMail())
			.notionLink(contact.getNotion())
			.build();
		return rdmDto;
	}

	public RDMDto getLanguage(String userId, Long readmeId) {
		MostLanguage language = mostLanguageRepository.findByUser_IdAndReadme_Id(userId, readmeId).get();
		RDMDto rdmDto = RDMDto.builder()
			.readmeType("LANGUAGE")
			.order(language.getOrder())
			.languageValue(userRepository.findById(userId).get().getNickname())
			.languageTheme(language.getTheme())
			.languageType(language.getType())
			.build();
		return rdmDto;
	}

	public RDMDto getTechstack(ReadmeTechstack readmeTechstack) {
		List<TechstackDto> techstackDtos = new ArrayList<>();
		List<Techstack> techstacks = techstackRepository.findByReadmeTechstack_IdOrderByOrder(readmeTechstack.getId());
		if(!techstacks.isEmpty()){
			for (Techstack t:techstacks) {
				techstackDtos.add(TechstackDto.toEntity(t));
			}
		}

		RDMDto rdmDto = RDMDto.builder()
			.readmeType("TECH")
			.order(readmeTechstack.getOrder())
			.techTitle(readmeTechstack.getTitle())
			.build();
		rdmDto.setTechStack(techstackDtos);
		return rdmDto;
	}

	public RDMDto getOreu(String userId, Long readmeId) {
		Oreu oreu = oreuRepository.findByUser_IdAndReadme_Id(userId, readmeId).get();
		RDMDto rdmDto = RDMDto.builder()
			.readmeType("PLANT")
			.order(oreu.getOrder())
			.oreuValue(userRepository.findById(userId).get().getNickname())
			.build();
		return rdmDto;
	}

	public void deleteReadme(String userId, Long readmeId){
		/*
		- BOJ
		- GIT
		- WRITING
		- CONTACT
		- LANGUAGE
		- TECH
		- PLANT
		 */

		// BOJ
		if(bojRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			bojRepository.delete(bojRepository.findByUser_IdAndReadme_Id(userId,readmeId).get());
		}

		// GIT
		if(gitstatsRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			gitstatsRepository.delete(gitstatsRepository.findByUser_IdAndReadme_Id(userId,readmeId).get());
		}

		// WRITING
		if(!writingRepository.findByUser_IdAndReadme_Id(userId,readmeId).isEmpty()) {
			List<Writing> writings = writingRepository.findByUser_IdAndReadme_Id(userId, readmeId);
			for (Writing w:writings) {
				writingRepository.delete(w);
			}
		}

		// CONTACT
		if(contactRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			contactRepository.delete(contactRepository.findByUser_IdAndReadme_Id(userId,readmeId).get());
		}

		// LANGUAGE
		if(mostLanguageRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			mostLanguageRepository.delete(mostLanguageRepository.findByUser_IdAndReadme_Id(userId,readmeId).get());
		}

		// TECH
		if(!readmeTechstackRepository.findByUser_IdAndReadme_Id(userId,readmeId).isEmpty()) {
			List<ReadmeTechstack> readmeTechstacks = readmeTechstackRepository.findByUser_IdAndReadme_Id(userId, readmeId);
			for (ReadmeTechstack r:readmeTechstacks) {
				// 삭제 진행
				List<Techstack> techstacks = techstackRepository.findByReadmeTechstack_IdOrderByOrder(r.getId());
				for (Techstack t: techstacks) {
					techstackRepository.delete(t);
				}
				readmeTechstackRepository.delete(r);
			}
		}

		// PLANT
		if(oreuRepository.findByUser_IdAndReadme_Id(userId,readmeId).isPresent()) {
			oreuRepository.delete(oreuRepository.findByUser_IdAndReadme_Id(userId,readmeId).get());
		}
	}

	public boolean hsaReadme(String userId){
		// 사용자 유무 검증
		User user = userRepository.findById(userId).orElseThrow();

		// 리드미 있다면 기존 리드미 업데이트
		if(readmeRepository.findByUser_Id(userId).isPresent()){
			return true;
		}
		return false;
	}
}

