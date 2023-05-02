import { useState } from "react";

import st from "./RepoList.module.scss";
import color from "../../styles/color.module.scss";
import indicator from "../../styles/common.module.scss";

const RepoItem = ({ repo, folderList }) => {
  const chrome = window.chrome;

  const [isClicked, setIsClicked] = useState(false);
  const [radioIndex, setRadioIndex] = useState(-1);

  const dropdownOnClick = (e) => {
    setIsClicked(!isClicked);
  };

  const radioCheck = (e) => {
    setRadioIndex(e);
  };

  const moveConfirm = () => {
    console.log(radioIndex);
  };

  const repoMove = (repoUrl) => {
    chrome.tabs.create({
      url: repoUrl,
      // type: "popup",
      // width: 800,
      // height: 600,
    });
  };

  const unClassified = (
    <div className={st.itemLayout}>
      <div className={st.itemLayoutLeft}>
        <div className={`${st.folderTitle} ${st.fontSize}`}>미분류</div>
        <div
          className={`${indicator.dropdownIndicator} ${color["black"]}`}
        ></div>
      </div>
      <div className={st.itemLayoutRight}>
        {-1 === radioIndex ? (
          <img
            className={st.radioBtn}
            onClick={() => radioCheck(-1)}
            src="/assets/ClickedIcon.svg"
          ></img>
        ) : (
          <img
            className={st.radioBtn}
            onClick={() => radioCheck(-1)}
            src="/assets/UnClickedIcon.svg"
          ></img>
        )}
      </div>
    </div>
  );

  // console.log(folderList);
  return (
    <div className={st.card}>
      <div className={st.layoutLeft}>
        <div className={st.cardTitle} onClick={() => repoMove(repo.url)}>
          {repo.name}
        </div>
        <div className={st.cardContent}>
          <div className={st.cardSummary}>
            <div
              className={
                repo.visibility === "public"
                  ? st.repoVisibilityPublic
                  : st.repoVisibilityPrivate
              }
            >
              <span className={st.fontSize}>{repo.visibility}</span>
            </div>
            <div className={st.repoIndicator}></div>
            <div className={st.repoLanguage}>
              <span className={st.fontSize}>{repo.language}</span>
            </div>
          </div>

          <div className={st.repoDescription}>
            <span className={st.fontSize}>{repo.description}</span>s
          </div>
        </div>
      </div>
      <div className={st.layoutRight}>
        <div className={st.dropdownBtn}>
          <span
            className={`${st.fontSize} ${st.dropdownTitle}`}
            onClick={() => dropdownOnClick(repo.id)}
          >
            Move to{" "}
          </span>
          <img
            className={`${st.dropdownIcon} ${isClicked ? st.reverse : ""}`}
            // src={isClicked ? "/assets/dropdownReverse.svg" : "/assets/dropdown.svg"}
            src="/assets/dropdown.svg"
            onClick={() => dropdownOnClick(repo.id)}
          ></img>
          <div
            className={isClicked ? st.dropdownActivate : st.dropdownDeactivate}
          >
            {folderList.map((key) => {
              return (
                <div
                  className={st.itemLayout}
                  onClick={() => radioCheck(key.id)}
                >
                  <div className={st.itemLayoutLeft}>
                    <div className={`${st.folderTitle} ${st.fontSize}`}>
                      {key.name}
                    </div>
                    <div
                      className={`${indicator.dropdownIndicator} ${
                        color[key.color]
                      }`}
                    ></div>
                  </div>
                  <div className={st.itemLayoutRight}>
                    {key.id === radioIndex ? (
                      <img
                        className={st.radioBtn}
                        src="/assets/ClickedIcon.svg"
                      ></img>
                    ) : (
                      <img
                        className={st.radioBtn}
                        src="/assets/UnClickedIcon.svg"
                      ></img>
                    )}
                  </div>
                </div>
              );
            })}
            {unClassified}

            <div className={st.confirmBtn} onClick={moveConfirm}></div>
          </div>
        </div>
        <div className={st.cardFooter}>
          <span className={st.fontSize}>
            <b>Updated on </b> <br></br>
            {repo.updateDate}
          </span>
        </div>
        {/* <DropdownModal list={folderList} /> */}
      </div>
    </div>
  );
};

export default RepoItem;
