import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 60;

const { reducer: timeLeftReducer, actions } = createSlice({
  name: "UserList",
  initialState,
  reducers: {
    setTimeLeft: (state, { payload }: PayloadAction<number>) => {
      state = payload;
    },
  },
});

export const { setTimeLeft } = actions;
export default timeLeftReducer;
