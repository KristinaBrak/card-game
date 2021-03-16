import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface User {
  name: string;
  isCurrent: boolean;
}

const initialState: User[] = [];

const { reducer: currentUserReducer, actions } = createSlice({
  name: "UserList",
  initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state = [...state, { name: payload.name, isCurrent: payload.isCurrent }];
      return state;
    },
    setCurrentUser: (state, { payload }: PayloadAction<User["name"]>) => {
      state.map((user) =>
        user.name === payload ? { ...user, isCurrent: true } : user
      );
    },
  },
});

export const { addUser, setCurrentUser } = actions;
export default currentUserReducer;
