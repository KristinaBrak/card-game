import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  isCurrent: boolean;
  score: number;
}

const initialState: User[] = [
  { name: "Lola", isCurrent: false, score: 420 },
  { name: "Vova", isCurrent: false, score: 456 },
  { name: "Shrek", isCurrent: false, score: 1006 },
];

const { reducer: currentUserReducer, actions } = createSlice({
  name: "UserList",
  initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state = [
        ...state,
        {
          name: payload.name,
          isCurrent: payload.isCurrent,
          score: payload.score,
        },
      ];
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
