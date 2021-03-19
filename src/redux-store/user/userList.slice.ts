import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  isCurrent: boolean;
  score: number;
}

interface UserList {
  userList: User[];
}

const initialState: UserList = {
  userList: [
    { name: "Lola", isCurrent: true, score: 420 },
    { name: "Vova", isCurrent: false, score: 456 },
    { name: "Shrek", isCurrent: false, score: 1006 },
  ],
};

const { reducer: currentUserReducer, actions } = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.userList = [
        ...state.userList,
        {
          name: payload.name,
          isCurrent: payload.isCurrent,
          score: payload.score,
        },
      ];
      return state;
    },
    setCurrentUser: (state, { payload }: PayloadAction<User["name"]>) => {
      state.userList.map((user) =>
        user.name === payload
          ? { ...user, isCurrent: true }
          : { ...user, isCurrent: false }
      );
    },
    setCurrentUserScore: (state, { payload }: PayloadAction<number>) => {
      const updatedList = state.userList.map((user) =>
        user.isCurrent ? { ...user, score: payload } : user
      );
      state.userList = updatedList;
    },
  },
});

export const { addUser, setCurrentUser, setCurrentUserScore } = actions;
export default currentUserReducer;
