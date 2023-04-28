import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import readme from "./readme";

const rootReducer = combineReducers({
  readme,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["readme"],
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export default persistReducers;
