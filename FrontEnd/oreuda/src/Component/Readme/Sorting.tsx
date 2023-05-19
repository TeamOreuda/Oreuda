"use client";

import st from "./Sorting.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectReadme,
  setMovingComponent,
  setNewPrevComp,
  setPrevCompChange,
} from "@/store/modules/readme";
import { mainCompChoiceData } from "./Main";
import { useEffect, useState } from "react";

const initGrabData: Data = {
  target: null,
  position: null,
  move_up: [],
  move_down: [],
  updateList: [],
};

interface Data {
  target: any;
  position: any;
  move_up: any;
  move_down: any;
  updateList: any;
}

export default function Sorting() {
  const dispatch = useAppDispatch();
  const prevComp = useAppSelector(selectReadme).prevComp;
  const nextComp = useAppSelector(selectReadme).nextComp;
  const currComponent = useAppSelector(selectReadme).currComponent;
  const textArr = useAppSelector(selectReadme).textArr;
  const nPrevComp = useAppSelector(selectReadme).nPrevComp;
  // console.log(currComponent);
  // console.log(prevComp);
  // console.log(nextComp);

  const [grab, setGrab] = useState(initGrabData);
  const [isDrag, setIsDrag] = useState(false);

  const newPrevComp: any = [];
  const createNewPrevComp = () => {
    prevComp.filter((el, index) => {
      if (Number(el) !== 0) {
        if (Number(el) == 7) {
          textArr.filter((el, index) => {
            newPrevComp.push(7 + `${index + 1}`);
          });
        } else {
          newPrevComp.push(el);
        }
      }
    });
    // console.log("newPrevComp: ", newPrevComp);

    dispatch(setNewPrevComp(newPrevComp));
  };
  useEffect(() => {
    createNewPrevComp();
    // dispatch(setNewPrevComp(newPrevComp));
  }, []);

  const onDragOver = (e: any) => {
    // e.stopPropagation();
    e.preventDefault();
    return true;
  };

  // console.log(grab.dataset);
  const onDragStart = (e: any) => {
    setIsDrag(true);
    setGrab({
      ...grab,
      target: e.target,
      position: Number(e.target.dataset.position),
      updateList: [...prevComp],
    });
    e.target.classList.add("grabbing");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const onDragEnd = (e: any) => {
    setIsDrag(false);
    e.target.classList.remove("grabbing");
    e.dataTransfer.dropEffect = "move";
    //setLists
    dispatch(setPrevCompChange([...grab.updateList]));

    setGrab({
      ...grab,
      target: null,
      move_up: [],
      move_down: [],
      updateList: [],
    });
    e.target.style.visibility = "visible";
  };

  const _onDragEnter = (e: any) => {
    let grabPosition = Number(grab.target.dataset.position);
    let listPosition = grab.position;
    let targetPosition = Number(e.target.dataset.position);

    let move_up = [...grab.move_up];
    let move_down = [...grab.move_down];
    // console.log(move_up);
    // console.log(move_down);

    let data = [...grab.updateList];

    // data[listPosition] = data.splice(targetPosition, 1, data[listPosition])[0];
    dispatch(setMovingComponent({ start: targetPosition, end: listPosition }));

    if (grabPosition > targetPosition) {
      move_down.includes(targetPosition)
        ? move_down.pop()
        : move_down.push(targetPosition);
    } else if (grabPosition < targetPosition) {
      move_up.includes(targetPosition)
        ? move_up.pop()
        : move_up.push(targetPosition);
    } else {
      move_down = [];
      move_up = [];
    }

    setGrab({
      ...grab,
      move_up,
      move_down,
      updateList: data,
      position: targetPosition,
    });
  };

  const _onDragLeave = (e: any) => {
    /* e.target.classList.remove("move_up");
    e.target.classList.remove("move_down"); */
    if (e.target === grab.target) {
      e.target.style.visibility = "hidden";
    }
  };

  // console.log(Number(grab.dataset.position));

  const createContents = () => {
    const arr: any = [];
    nPrevComp.map((el: any, index: number) => {
      if (el) {
        let classNames = "";

        grab.move_up.includes(index) && (classNames = "move_up");
        grab.move_down.includes(index) && (classNames = "move_down");
        // console.log(classNames);

        // classNames += ` `;
        arr.push(
          <div
            key={index}
            data-position={index}
            className={`${st.componentDiv} ${isDrag ? st.true : ""} ${
              grab.move_up.includes(index)
                ? st.move_up
                : grab.move_down.includes(index)
                ? st.move_down
                : ""
            }`}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            // onDrop={onDrop}
            // onClick={handleClick}
            onDragEnter={_onDragEnter}
            onDragLeave={_onDragLeave}
            draggable
          >
            💚{" "}
            {el < 10
              ? mainCompChoiceData[el]
              : `${mainCompChoiceData[el.substring(0, 1)]} - ${el.substring(
                  1,
                  2
                )}`}
          </div>
        );
      }
    });

    return arr;
  };

  return (
    <div className={st.body}>
      <div className={st.titleDiv}>
        <span>리드미 요소 배치</span>
        <p>드래그를 하여 리드미 순서를 정해보세요!</p>
      </div>
      <div className={st.contentDiv}>
        <div className={st.boxDiv} onDragOver={onDragOver}>
          {createContents()}
        </div>
      </div>
    </div>
  );
}
