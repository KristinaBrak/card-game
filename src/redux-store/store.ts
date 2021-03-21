import { combineReducers, configureStore } from "@reduxjs/toolkit";

import levelReducer from "./level-difficulty/levelDifficulty.slice";
import userListReducer from "./user/userList.slice";
import timeLeftReducer from "./time-left/timeLeft.slice";
import gameReducer from "./game/game.slice";

const rootReducer = combineReducers({
  levelDifficulty: levelReducer,
  userList: userListReducer,
  timeLeft: timeLeftReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
