import { combineReducers, configureStore } from "@reduxjs/toolkit";

import levelReducer from "./level-difficulty/levelDifficulty.slice";
import userListReducer from "./user/userList.slice";

const rootReducer = combineReducers({
  levelDifficulty: levelReducer,
  userList: userListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
