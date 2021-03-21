import { combineReducers, configureStore } from "@reduxjs/toolkit";

import gameReducer from "./game/game.slice";

const rootReducer = combineReducers({
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
