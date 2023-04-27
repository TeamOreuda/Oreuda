import st from "./RepoList.module.scss";

const repoList = [
  {
    name: "twitter-algorithm",
    visibility: "private",
    language: "Python",
    description: "Source code for Twitter's Recommendation Algorithm ",
    updateDate: "Dec 29, 2021",
  },
  {
    name: "movie-list-crawling",
    visibility: "public",
    language: "Python",
    description:
      "movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project",
    updateDate: "Dec 29, 2022",
  },
  {
    name: "twitter-algorithm",
    visibility: "private",
    language: "Python",
    description: "Source code for Twitter's Recommendation Algorithm ",
    updateDate: "Dec 29, 2021",
  },
  {
    name: "movie-list-crawling",
    visibility: "public",
    language: "Python",
    description:
      "movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project",
    updateDate: "Dec 29, 2022",
  },
  {
    name: "twitter-algorithm",
    visibility: "private",
    language: "Python",
    description: "Source code for Twitter's Recommendation Algorithm ",
    updateDate: "Dec 29, 2021",
  },
  {
    name: "movie-list-crawling",
    visibility: "public",
    language: "Python",
    description:
      "movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project",
    updateDate: "Dec 29, 2022",
  },
  {
    name: "twitter-algorithm",
    visibility: "private",
    language: "Python",
    description: "Source code for Twitter's Recommendation Algorithm ",
    updateDate: "Dec 29, 2021",
  },
  {
    name: "movie-list-crawling",
    visibility: "public",
    language: "Python",
    description:
      "movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project",
    updateDate: "Dec 29, 2022",
  },
];

const RepoList = () => {
  return (
    <div className={st.cardList}>
      {repoList.map((key) => {
        return (
          <div className={st.card}>
            <div className={st.cardHeader}>
              <div>{key.name}</div>
              <div className={st.dropdownBtn}>
                Move to{" "}
                <img
                  className={st.dropdownIcon}
                  src="/assets/dropdown.svg"
                ></img>
              </div>
            </div>
            <div className={st.cardContent}>
              <div className={st.layoutTop}>
                <div className={key.visibility === "public" ? st.repoVisibilityPublic : st.repoVisibilityPrivate}>{key.visibility}</div>
                <div className={st.repoIndicator}></div>
                <div className={st.repoLanguage}>{key.language}</div>
              </div>
              <div className={st.layoutBottom}>
                <div className={st.repoDescription}>{key.description}</div>
              </div>
            </div>
            <div className={st.cardFooter}>{key.updateDate}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RepoList;
