import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LevelDefinition {
  name: "easy" | "medium" | "hard";
  pointValue: number;
  timeMultiply: number;
  cardCount: number;
}

export interface LevelDifficulty {
  definition: LevelDefinition;
}

const getLevelDifficultyDefinition = (
  difficultyName: string
): LevelDefinition => {
  switch (difficultyName) {
    case "easy":
      return {
        name: "easy",
        pointValue: 5,
        timeMultiply: 1,
        cardCount: 8,
      };
    case "medium":
      return {
        name: "medium",
        pointValue: 5,
        timeMultiply: 2,
        cardCount: 12,
      };
    case "hard":
      return {
        name: "hard",
        pointValue: 5,
        timeMultiply: 3,
        cardCount: 16,
      };
    default:
      return {
        name: "easy",
        pointValue: 5,
        timeMultiply: 1,
        cardCount: 8,
      };
  }
};

const initialState: LevelDifficulty = {
  definition: {
    name: "easy",
    pointValue: 5,
    timeMultiply: 1,
    cardCount: 8,
  },
};

const { reducer: levelReducer, actions } = createSlice({
  name: "levelDifficulty",
  initialState,
  reducers: {
    changeDifficulty: (state, { payload }: PayloadAction<string>) => {
      state.definition = getLevelDifficultyDefinition(payload);
      console.log(state.definition.cardCount);
    },
  },
});

export const { changeDifficulty } = actions;
export default levelReducer;
