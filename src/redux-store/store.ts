import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userListReducer from "./user/userList.slice";

import gameReducer from "./game/game.slice";

const rootReducer = combineReducers({
  userList: userListReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
