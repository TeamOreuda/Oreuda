"use client"

import st from "./addFolder.module.scss";

export default function addFolder(props: { clickModal: any }) { 

  return (<div className={st.modalBox} onClick={props.clickModal}>
    <div className={st.modalContent} onClick={(e) => e.stopPropagation()}>
      <h1>Repository</h1>
    </div>

  </div>)}