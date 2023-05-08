import React from 'react';
import { useEffect, useRef, useState } from 'react/cjs/react.development';

import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/items';

const Nemo = memo(
  ({
    id,
    index,
    nemo,
    moveNemo,
    someDragging,
    setSomeDragging,
  }) => {
    // 드래그

    const [{ isDragging }, dragRef, previewRef] = useDrag(
          //isDragging은 아이템이 드래깅 중일때 true, 아닐때 false를 리턴 받는다. 드래깅 중인 아이템을 스타일링 할때 사용했다.
          //dragRef는 리액트의 useRef처럼 작동한다. 드래그될 부분에 선언해주면된다. 네모의 타이틀이 있는 부분에 선언했다. 
          //previewRef는 드래깅될때 보여질 프리뷰 이미지를 뜻한다. 네모전체를 감싸는 div에 선언해주었다.
          //세가지 변수는 순서만 지켜서 이름은 아무렇게나 선언해주면된다. 나는 공식홈페이지의 변수명을 사용했다.
      () => ({
        type: ItemTypes.Nemo,
        //간단하게 items.js를 만들어 그안에 nemo:'nemo'이런식으로 오브젝트를 만들어 주었다.
        //굳이 이렇게 하지 않고 ItemTypes.Nemo 를 'nemo'로 해주어도 문제는 없다.
        //후에 아이템들이 여러가지가 생겼을때 관리하기 편하게 items.js에 선언해준듯하다.
        //type:에 선언되는 것은 앞으로 드래깅 될 아이템은 어떤타입이다라는 걸 선언해준다. 
        item: { id, index },
        //item:에 선언되는 것은 'nemo'로 선언한 타입의 드래깅 물체안에 넣어줄 정보를 세팅한다.
        //나는 네모의 id와,index를 넣어주었다. id와 index는 props로 받아온정보로 부터 가져왔다.
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),//isDragging 변수가 현재 드래깅중인지 아닌지를 리턴해주는 부분.
        }),
        end: (item, monitor) => { //드래그가 끝났을때 작동하는 부분.
          const { id: originId, index: originIndex } = item;
          const didDrop = monitor.didDrop();
          if (!didDrop) {//didDrop이 !(아니다)라는 것은 dropRef로 선언한 태그위에 드랍되지 않음 을 의미한다.
            //그때는 원래의 위치대로 이동.
            moveNemo(originId, originIndex); 
            //moveNemo는 변경할 네모의 id와 변경될 index를 주면 순서를 바꾸어주는 함수다.
            //네모들의 state가 상위 컴포넌트인 page에 선언되어있기 때문에 page에 선언되어 있다. 
          }
        },
      }),
      [id, index, moveNemo]
    );
    
    // 드랍 *공식사이트 예시에서는 하나의 dropRef로 구현되어있지만 
    // 시행착오와 고민 끝에 dropRef를 두가지로 만들어 네모상자의 양쪽에 배치하였다.
    // 왼쪽에 드랍하면 드래그한 상자를 드랍한 상자 왼쪽 인덱스로 이동.
    // 오른쪽에 드랍하면 index + 1 하여 오른쪽 인덱스로 이동하도록 구현했다.
    const [, dropLeft] = useDrop(
      () => ({
        accept: ItemTypes.Nemo,
        canDrop: () => false,
        hover({ id: draggedId, index: orgIndex }) {
          if (draggedId !== id) {
            moveNemo(draggedId, index);
          }
        },
      }),
      [moveNemo]
    );
    const [, dropRight] = useDrop(
      () => ({
        accept: ItemTypes.Nemo,
        canDrop: () => false,
        hover({ id: draggedId, index: orgIndex }) {
          if (draggedId !== id) {
            orgIndex !== index + 1 && moveNemo(draggedId, index + 1);
          }
        },
      }),
      [moveNemo]
    );
    
    useEffect(() => {
      isDragging ? setSomeDragging(true) : setSomeDragging(false);
    }, [isDragging, setSomeDragging]);
    //이 부분은 두가지 dropRef 네모를 가리게되면서 드래깅될때만 dropRef의 z-index가 최상위로 올라와 기능을 하고
    //평소에는 맨뒤로 내려가 네모안의 비디오를 클릭할수있게 상위컴포넌트에서 someDragging이라는 변수를 만들었다.

    return (
      <div ref={previewRef} //previewRef  처음에는 프리뷰와 dropRef 이곳에 지정했다.
           style={{opacity: isDragging ? '0.3' : '1',}}> //드래그중인 아이템의 투명도를 30%로 주었다.
        <div ref={dragRef} title="다른 카드 옆으로 드래그해서 위치를 변경합니다."> //dragRef
          {nemo.nemoTitle}
        </div>
        <div className={styles.imgs}/>
        //dropRef   좀 더 자연스러운 ux를 구현하기 위해서 dropRef를 두개로 나누었다. 
        //아래 두 dropRef는 absolutef로 네모의 왼쪽 오른쪽에 배치.
        <div
          ref={dropLeft}
          className={`${styles.drop} ${styles.left}`}
          style={{ zIndex: someDragging ? 30 : 0 }} 
          // dropRef가 무언가 드래그중일때 zindex를 30주고, 평소에는 0으로 주었다.
        ></div>
        <div
          ref={dropRight}
          className={`${styles.drop} ${styles.right}`}
          style={{ zIndex: someDragging ? 30 : 0 }}
        ></div>
      </div>
    );
  }
);
export default Nemo;