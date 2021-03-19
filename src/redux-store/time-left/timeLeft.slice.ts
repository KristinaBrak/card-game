import { createSlice } from "@reduxjs/toolkit";

interface TimeCounter {
  startTime: number;
  timeSpent: number;
}

interface TimeLeft {
  time: TimeCounter;
}

const roundTime = (time: number) => {
  return Math.floor(time / 1000) * 1000;
};

const initialState: TimeLeft = {
  time: { startTime: 0, timeSpent: 0 },
};

const { reducer: timeLeftReducer, actions } = createSlice({
  name: "timeLeft",
  initialState,
  reducers: {
    start: (state) => {
      const currentTime = new Date().getTime();
      state.time.startTime = roundTime(currentTime);
    },
    pause: (state) => {
      const currentTime = new Date().getTime();
      state.time.timeSpent = roundTime(state.time.startTime - currentTime);
    },
    resume: (state) => {
      const currentTime = new Date().getTime();
      state.time.startTime = roundTime(currentTime + state.time.timeSpent);
      state.time.timeSpent = 0;
    },
    reset: (state) => {
      state.time.startTime = 0;
      state.time.timeSpent = 0;
    },
    stop: (state) => {
      const result = roundTime(new Date().getTime());
      state.time.timeSpent = result - state.time.startTime;
    },
  },
});

export const { start, pause, resume, reset, stop } = actions;
export default timeLeftReducer;
