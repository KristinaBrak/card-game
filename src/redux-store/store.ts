import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import levelReducer from "./level-difficulty/levelDifficulty.slice";
import userListReducer from "./user/userList.slice";
import timeLeftReducer from "./time-left/timeLeft.slice";
import cardDeckReducer from "./card-deck/cardDeck.slice";

const rootReducer = combineReducers({
  levelDifficulty: levelReducer,
  userList: userListReducer,
  timeLeft: timeLeftReducer,
  cardDeck: cardDeckReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
