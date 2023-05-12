import axios from "axios";

export const CreateReadme = (ACCESS_TOKEN: any) => {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/readme`,
    {
      readmes: {},
    },
    {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }
  );
};

/**
 * 리스트 제외 request type은 String
 *
 * 리드미 리스트(readmes)
 * 리드미 종류(readmeType)
 * 백준 아이디(bojValue)
 * 백준 테마(bojTheme)
 * 깃 테마(gitTheme)
 * 글 제목(writingTitle)
 * 글 내용(writingContents)
 * 블로그(blogLink)
 * 메일(mailLink)
 * 노션(notionLink)
 * 언어테마(languageTheme)
 * 언어타입(languageType)
 * 기술스택 리스트(techStack) - 리스트
 */
