import { useState } from "react";

import st from "./RepoList.module.scss";
import color from "../../styles/color.module.scss";
import indicator from "../../styles/common.module.scss";

const RepoItem = ({ repo, folderList, dropDownIndex, setDropDownIndex }) => {
  // const chrome = window.chrome;

  const [isClicked, setIsClicked] = useState(false);
  const [radioIndex, setRadioIndex] = useState(-1);

  const dropdownOnClick = () => {
    if (isClicked && repo.id === dropDownIndex) {
      setIsClicked(false);
      setDropDownIndex(-1);
      setRadioIndex(-1);
    } else {
      setDropDownIndex(repo.id);
      setIsClicked(true);
    }
  };

  const radioCheck = (e) => {
    if (e == radioIndex) {
      setRadioIndex(-1);
    } else {
      setRadioIndex(e);
    }
  };

  const moveConfirm = () => {
    console.log(radioIndex);
  };

  const repoMove = (repoUrl) => {
    window.chrome.tabs.create({
      url: "https://github.com/tykimdream",
      // type: "popup",
      // width: 800,
      // height: 600,
    });
  };

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
            <span className={st.fontSize}>{repo.description}</span>
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
            onClick={() => dropdownOnClick()}
          ></img>
          <div
            className={
              isClicked && dropDownIndex === repo.id
                ? st.dropdownActivate
                : st.dropdownDeactivate
            }
          >
            {folderList.map((key) => {
              return (
                <div
                  className={`${
                    key.id === radioIndex ? st.itemSelected : st.itemNonSelected
                  } ${st.itemLayout}`}
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

            <div
              className={`${radioIndex !== -1 ? st.confirmBtnOnSelected : ""} ${
                st.confirmBtn
              }`}
              onClick={moveConfirm}
            ></div>
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
