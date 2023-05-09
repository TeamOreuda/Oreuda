package com.oreuda.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.dto.ReadmeDto;
import com.oreuda.api.domain.entity.Readme;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.repository.BojRepository;
import com.oreuda.api.repository.ContactRepository;
import com.oreuda.api.repository.MostLanguageRepository;
import com.oreuda.api.repository.ReadmeRepository;
import com.oreuda.api.repository.TechstackRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.api.repository.WritingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReadmeService {

	private final UserRepository userRepository;
	private final BojRepository bojRepository;
	private final ReadmeRepository readmeRepository;
	private final WritingRepository writingRepository;
	private final ContactRepository contactRepository;
	private final TechstackRepository techstackRepository;
	private final MostLanguageRepository mostLanguageRepository;

	public void saveReadme(List<ReadmeDto> readmes, String userId) {
		// 사용자
		User user = userRepository.findById(userId).get();
		Readme readme = Readme.builder()
			.user(user)
			.build();
		readmeRepository.save(readme);

		// for (int i = 0; i< readmes.size(); i++) {
		// 	switch (readmes.get(i).getReadmeType()) {
		// 		case "BOJ":
		// 			saveBoj(readmes.get(i), user, i, readme);
		// 			break;
		//
		// 		// case "GIT":
		// 		// 	saveBoj(readmes.get(i), user, i);
		// 		// 	break;
		//
		// 		case "WRITING":
		// 			saveWriting(readmes.get(i), user, i);
		// 			break;
		//
		// 		case "CONTACT":
		// 			saveContact(readmes.get(i), user, i);
		// 			break;
		//
		// 		case "LANGUAGE":
		// 			saveLanguage(readmes.get(i), user, i);
		// 			break;
		//
		// 		case "TECH":
		// 			saveWriting(readmes.get(i), user, i);
		// 			break;
		//
		// 		case "PLANT":
		// 			saveWriting(readmes.get(i), user, i);
		// 			break;
		// 	}
		// }

	}

	// public void saveBoj(ReadmeDto readmeDto, User user, int order, Readme readme){
	// 	Boj boj = Boj.builder()
	// 		.value(readmeDto.getBojValue())
	// 		.theme(readmeDto.getBojTheme())
	// 		.build();
	// 	bojRepository.save(boj);
	//
	// }
	//
	// public void saveWriting(ReadmeDto readmeDto, User user, int order){
	// 	Writing writing = Writing.builder()
	// 		.title(readmeDto.getWritingTitle())
	// 		.contents(readmeDto.getWritingContents())
	// 		.build();
	// 	writingRepository.save(writing);
	//
	// 	Readme readme = Readme.builder()
	// 		.user(user)
	// 		.order(order)
	// 		.writing(writing)
	// 		.build();
	// 	readmeRepository.save(readme);
	// }
	//
	// public void saveContact(ReadmeDto readmeDto, User user, int order){
	// 	Contact contact = Contact.builder()
	// 		.blog(readmeDto.getBlogLink())
	// 		.mail(readmeDto.getMailLink())
	// 		.notion(readmeDto.getNotionLink())
	// 		.build();
	// 	contactRepository.save(contact);
	//
	// 	Readme readme = Readme.builder()
	// 		.user(user)
	// 		.type(ReadmeType.CONTACT)
	// 		.order(order)
	// 		.contact(contact)
	// 		.build();
	// 	readmeRepository.save(readme);
	// }
	//
	// public void saveLanguage(ReadmeDto readmeDto, User user, int order){
	// 	MostLanguage mostLanguage = MostLanguage.builder()
	// 		.theme(readmeDto.getLanguageTheme())
	// 		.build();
	// 	mostLanguageRepository.save(mostLanguage);
	//
	// 	Readme readme = Readme.builder()
	// 		.user(user)
	// 		.type(ReadmeType.LANGUAGE)
	// 		.order(order)
	// 		.mostLanguage(mostLanguage)
	// 		.build();
	// 	readmeRepository.save(readme);
	// }
	//
	// public void saveTech(ReadmeDto readmeDto, User user, int order){
	// 	for (int i = 0; i < readmeDto.getTechStack().size(); i++) {
	// 		Techstack techstack = Techstack.builder()
	// 			.name(readmeDto.getTechStack().get(i))
	// 			.order(i)
	// 			.build();
	// 		techstackRepository.save(techstack);
	//
	//
	// 		Readme readme = Readme.builder()
	// 			.user(user)
	// 			.type(ReadmeType.LANGUAGE)
	// 			.order(order)
	// 			.build();
	// 		readmeRepository.save(readme);
	// 	}


	//}
}

