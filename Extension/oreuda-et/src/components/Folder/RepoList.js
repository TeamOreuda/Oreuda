import { useState } from "react";

import st from "./RepoList.module.scss";
import RepoItem from "./RepoItem";

const repoList = [
  {
    id: 1,
    name: "twitter-algorithm",
    visibility: "private",
    language: "Python",
    description: "Source code for Twitter's Recommendation Algorithm ",
    updateDate: "Dec 29, 2021",
  },
  {
    id: 2,
    name: "movie-list-crawling",
    visibility: "public",
    language: "Python",
    description:
      "movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project",
    updateDate: "Dec 29, 2022",
  },
  {
    id: 3,
    name: "twitter-algorithm",
    visibility: "private",
    language: "Python",
    description: "Source code for Twitter's Recommendation Algorithm ",
    updateDate: "Dec 29, 2021",
  },
  {
    id: 4,
    name: "movie-list-crawling",
    visibility: "public",
    language: "Python",
    description:
      "movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project",
    updateDate: "Dec 29, 2022",
  },
  {
    id: 5,
    name: "twitter-algorithm",
    visibility: "private",
    language: "Python",
    description: "Source code for Twitter's Recommendation Algorithm ",
    updateDate: "Dec 29, 2021",
  },
  {
    id: 6,
    name: "movie-list-crawling",
    visibility: "public",
    language: "Python",
    description:
      "movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project",
    updateDate: "Dec 29, 2022",
  },
  {
    id: 7,
    name: "twitter-algorithm",
    visibility: "private",
    language: "Python",
    description: "Source code for Twitter's Recommendation Algorithm ",
    updateDate: "Dec 29, 2021",
  },
  {
    id: 8,
    name: "movie-list-crawling",
    visibility: "public",
    language: "Python",
    description:
      "movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project movie list crawling project",
    updateDate: "Dec 29, 2022",
  },
];

const folderList = [
  { id: 1, name: "FE", color: "blue", order: 1, repositoryCount: 3 },
  { id: 2, name: "BE", color: "pink", order: 2, repositoryCount: 3 },
  {
    id: 3,
    name: "Team Project",
    color: "green",
    order: 3,
    repositoryCount: 3,
  },
];
const RepoList = () => {
  // repoList.map((repo) => {
  //   console.log(repo);
  // });
  return (
    <div className={st.cardList}>
      {repoList.map((repo) => {
        console.log(repo);
        return <RepoItem repo={repo} folderList= {folderList} />;
      })}
    </div>
  );
};

export default RepoList;