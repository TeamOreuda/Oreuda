"use client";

import st from "./Sorting.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectReadme, setMovingComponent } from "@/store/modules/readme";
import { mainCompChoiceData } from "./Main";
import { useState } from "react";

export default function Sorting() {
  const dispatch = useAppDispatch();
  const prevComp = useAppSelector(selectReadme).prevComp;
  const nextComp = useAppSelector(selectReadme).nextComp;
  const currComponent = useAppSelector(selectReadme).currComponent;
  // console.log(currComponent);
  // console.log(prevComp);
  // console.log(nextComp);

  const [grab, setGrab] = useState({ dataset: { position: null } });

  // console.log(grab.dataset);
  const onDragStart = (e: any) => {
    setGrab(e.currentTarget);
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  const onDrop = (e: any) => {
    let grabPosition = Number(grab.dataset.position);
    let targetPosition = Number(e.target.dataset.position);
    // console.log(
    //   Number(grab.dataset.position),
    //   Number(e.target.dataset.position)
    // );
    dispatch(setMovingComponent({ start: grabPosition, end: targetPosition }));
  };

  // console.log(Number(grab.dataset.position));

  const createContents = () => {
    const arr: any = [];
    prevComp.map((el, index: number) => {
      if (index !== 0 && el) {
        arr.push(
          <div
            key={index}
            data-position={index}
            className={st.componentDiv}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={handleClick}
            draggable
          >
            <div data-position={index} draggable={false}>
              💚 {mainCompChoiceData[el]}
            </div>
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
        <div className={st.boxDiv}>{createContents()}</div>
      </div>
    </div>
  );
}
