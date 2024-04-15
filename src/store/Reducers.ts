import { combineReducers } from "@reduxjs/toolkit";
import { StorageMmkv } from "../store/Storage";
import { persistReducer } from "redux-persist";
import { emptySplitApi } from "../service/api";
import { userSlice } from "./User/User";

const persistConfig = {
  key: "root",
  storage: StorageMmkv,
  whitelist: ["token", "userInfo"],
  blacklist: ["righeLibretto", "trattiCarriera"],
};

export const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userSlice.reducer),
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});
