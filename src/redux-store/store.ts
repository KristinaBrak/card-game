import { combineReducers, configureStore } from "@reduxjs/toolkit";

import levelReducer from "./level-difficulty/levelDifficulty.slice";
import userListReducer from "./user/userList.slice";
import timeLeftReducer from "./time-left/timeLeft.slice";
const rootReducer = combineReducers({
  levelDifficulty: levelReducer,
  userList: userListReducer,
  timeLeft: timeLeftReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
