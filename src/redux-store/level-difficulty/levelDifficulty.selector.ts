import { RootState } from "../store";

export const levelDifficultySelector = (state: RootState) =>
  state.levelDifficulty.definition;
