import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import readme from "./readme";

const rootReducer = combineReducers({
  readme,
});

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined" ? localStorage : createNoopStorage();
console.log(storage);
console.log(typeof window);

const persistConfig = {
  key: "root", // 스토리지에 사용되는 키 명칭
  storage: storage, // 어떤 스토리지를 쓸지 필수 입력(storage 혹은 sessionStorage)
  whiteList: ["readme"], //whiteList: 스토리지를 통해 관리할 항목
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export default persistReducers;
