package com.oreuda.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.dto.ReadmeDto;
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
		// 사용자
		User user = userRepository.findById(userId).get();
		Readme readme = Readme.builder()
			.user(user)
			.build();
		readmeRepository.save(readme);

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
			.val(readmeDto.getGitValue())
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
			.val(readmeDto.getGitValue())
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
			.build();
		readmeTechstackRepository.save(readmeTechstack);

		for (int i = 0; i < readmeDto.getTechStack().size(); i++) {
			Techstack techstack = Techstack.builder()
				.readmeTechstack(readmeTechstack)
				.name(readmeDto.getTechStack().get(i))
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
}

