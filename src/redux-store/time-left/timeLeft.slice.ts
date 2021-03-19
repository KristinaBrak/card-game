import { createSlice } from "@reduxjs/toolkit";

interface TimeLeft {
  startTime: number;
  timeSpent: number;
}

const roundTime = (time: number) => {
  return Math.ceil(time / 1000) * 1000;
};

const initialState: TimeLeft = { startTime: 0, timeSpent: 0 };

const { reducer: timeLeftReducer, actions } = createSlice({
  name: "timeLeft",
  initialState,
  reducers: {
    start: (state) => {
      const currentTime = new Date().getTime();
      state.startTime = roundTime(currentTime);
    },
    pause: (state) => {
      const currentTime = new Date().getTime();
      state.timeSpent = roundTime(state.startTime - currentTime);
    },
    resume: (state) => {
      const currentTime = new Date().getTime();
      state.startTime = roundTime(currentTime + state.timeSpent);
      state.timeSpent = 0;
    },
    reset: (state) => {
      state.startTime = 0;
      state.timeSpent = 0;
    },
  },
});

export const { start, pause, resume, reset } = actions;
export default timeLeftReducer;
