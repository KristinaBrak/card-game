import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Game {
  state: "started" | "paused" | "finished";
  score: number;
}

const initialState: Game = {
  state: "started",
  score: 0,
};

const { reducer: gameReducer, actions } = createSlice({
  name: "game",
  initialState,
  reducers: {
    setState: (
      state,
      { payload }: PayloadAction<"started" | "paused" | "finished">
    ) => {
      state.state = payload;
    },
    addScore: (state, { payload }: PayloadAction<number>) => {
      state.score = state.score + payload;
    },
  },
});

export const { setState, addScore } = actions;
export default gameReducer;
