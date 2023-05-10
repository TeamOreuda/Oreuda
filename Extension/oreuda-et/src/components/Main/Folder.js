import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";

import st from "./FolderList.module.scss";
import folderSt from "./Folder.module.scss";

const Folder = ({ folder, id, order, focusIdx, SetFocusIdx, moveFolder }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const [{ isDragging }, dragRef, previewRef] = useDrag(
    //isDragging은 아이템이 드래깅 중일때 true, 아닐때 false를 리턴 받는다. 드래깅 중인 아이템을 스타일링 할때 사용했다.
    //dragRef는 리액트의 useRef처럼 작동한다. 드래그될 부분에 선언해주면된다. 네모의 타이틀이 있는 부분에 선언했다.
    //previewRef는 드래깅될때 보여질 프리뷰 이미지를 뜻한다. 네모전체를 감싸는 div에 선언해주었다.
    //세가지 변수는 순서만 지켜서 이름은 아무렇게나 선언해주면된다. 나는 공식홈페이지의 변수명을 사용했다.
    () => ({
      type: "folder",
      //간단하게 items.js를 만들어 그안에 nemo:'nemo'이런식으로 오브젝트를 만들어 주었다.
      //굳이 이렇게 하지 않고 ItemTypes.Nemo 를 'nemo'로 해주어도 문제는 없다.
      //후에 아이템들이 여러가지가 생겼을때 관리하기 편하게 items.js에 선언해준듯하다.
      //type:에 선언되는 것은 앞으로 드래깅 될 아이템은 어떤타입이다라는 걸 선언해준다.
      item: { id, order },
      //item:에 선언되는 것은 'nemo'로 선언한 타입의 드래깅 물체안에 넣어줄 정보를 세팅한다.
      //나는 네모의 id와,index를 넣어주었다. id와 index는 props로 받아온정보로 부터 가져왔다.
      collect: (monitor) => ({
        isDragging: monitor.isDragging(), //isDragging 변수가 현재 드래깅중인지 아닌지를 리턴해주는 부분.
      }),
      end: (item, monitor) => {
        //드래그가 끝났을때 작동하는 부분.
        const { id: originId, order: originIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          //didDrop이 !(아니다)라는 것은 dropRef로 선언한 태그위에 드랍되지 않음 을 의미한다.
          //그때는 원래의 위치대로 이동.
          // 이건 이미지로 올렸을 때만 작동
          moveFolder(originId, originIndex);
          //moveNemo는 변경할 네모의 id와 변경될 index를 주면 순서를 바꾸어주는 함수다.
          //네모들의 state가 상위 컴포넌트인 page에 선언되어있기 때문에 page에 선언되어 있다.
        }
      },
    }),
    [id, order, moveFolder]
  );

  // 드랍 *공식사이트 예시에서는 하나의 dropRef로 구현되어있지만
  // 시행착오와 고민 끝에 dropRef를 두가지로 만들어 네모상자의 양쪽에 배치하였다.
  // 왼쪽에 드랍하면 드래그한 상자를 드랍한 상자 왼쪽 인덱스로 이동.
  // 오른쪽에 드랍하면 index + 1 하여 오른쪽 인덱스로 이동하도록 구현했다.
  const [, dropLeft] = useDrop(
    () => ({
      accept: "folder",
      // canDrop: () => false,
      // hover({ id: draggedId, order: orgIndex }) {
      //   if (draggedId !== id) {
      //     moveFolder(draggedId, order);
      //   }
      // },
      drop({ id: draggedId, order: orgIndex }) {
        if (draggedId !== id) {
          moveFolder(draggedId, order);
        }
      },

    }),
    [moveFolder]
  );
  const [, dropRight] = useDrop(
    () => ({
      accept: "folder",
      // canDrop: () => false,
      // hover({ id: draggedId, order: orgIndex }) {
      //   if (draggedId !== id) {
      //     orgIndex !== order + 1 && moveFolder(draggedId, order + 1);
      //   }
      // },
      drop({ id: draggedId, order: orgIndex }) {
        if (draggedId !== id) {
          orgIndex !== order + 1 && moveFolder(draggedId, order + 1);
        }
      },
    }),
    [moveFolder]
  );

  const doubleClick = (key) => {
    console.log(key.name);
    navigate(`/folder/${key.name}`);
  };

  const focusHandler = () => {
    if (isFocused && folder.id === focusIdx) {
      setIsFocused(false);
      SetFocusIdx(-1);
    } else {
      setIsFocused(true);
      SetFocusIdx(folder.id);
    }
  };
  return (
    <div className = {folderSt.layout}>
      <div className = {folderSt.leftRef} ref={dropLeft}>&nbsp;</div>

      <div
        ref={previewRef}
        onDoubleClick={() => doubleClick(folder)}
        onClick={() => focusHandler()}
        className={`${
          isFocused && focusIdx === folder.id
            ? folderSt.focused
            : folderSt.unFocused
        } ${folderSt.folderItem}`}
      >
        <div className={folderSt.blink}>&nbsp;</div>
        <div className={st.folderDiv}>
          <img
            ref={dragRef}
            title="다른 카드 옆으로 드래그해서 위치를 변경합니다."
            className={st.folderImg}
            src={`/assets/folders/${folder.color}.svg`}
          ></img>
        </div>
        <div className={st.folderTitle}>{folder.name}</div>
      </div>
      <div className = {folderSt.rightRef} ref={dropRight}>&nbsp;</div>
    </div>
  );
  // }
};

export default Folder;
