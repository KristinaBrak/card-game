import { combineReducers, configureStore } from "@reduxjs/toolkit";

import levelReducer from "./level-difficulty/levelDifficulty.slice";

const rootReducer = combineReducers({
  levelDifficulty: levelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
