import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface LevelDefinition {
  name: Difficulty;
  pointValue: number;
  timeMultiply: number;
  cardCount: number;
}

export interface LevelDifficulty {
  definition: LevelDefinition;
}

const getLevelDifficultyDefinition = (
  difficultyName: Difficulty
): LevelDefinition => {
  switch (difficultyName) {
    case Difficulty.EASY:
      return {
        name: Difficulty.EASY,
        pointValue: 5,
        timeMultiply: 1,
        cardCount: 8,
      };
    case Difficulty.MEDIUM:
      return {
        name: Difficulty.MEDIUM,
        pointValue: 5,
        timeMultiply: 2,
        cardCount: 12,
      };
    case Difficulty.HARD:
      return {
        name: Difficulty.HARD,
        pointValue: 5,
        timeMultiply: 3,
        cardCount: 16,
      };
    default:
      return {
        name: Difficulty.EASY,
        pointValue: 5,
        timeMultiply: 1,
        cardCount: 8,
      };
  }
};

const initialState: LevelDifficulty = {
  definition: {
    name: Difficulty.EASY,
    pointValue: 5,
    timeMultiply: 1,
    cardCount: 8,
  },
};

const { reducer: levelReducer, actions } = createSlice({
  name: "levelDifficulty",
  initialState,
  reducers: {
    changeDifficulty: (
      state,
      { payload }: PayloadAction<LevelDefinition["name"]>
    ) => {
      state.definition = getLevelDifficultyDefinition(payload);
    },
  },
});

export const { changeDifficulty } = actions;
export default levelReducer;
