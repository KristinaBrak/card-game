export interface Pokemon {
  name: string;
  url: string;
}

export interface Card {
  id: string;
  type: Pokemon["name"];
  cardState: "closed" | "opened" | "solved";
  backImage: string;
  frontImage: Pokemon["url"];
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface Level {
  name: Difficulty;
  pointValue: number;
  timeMultiply: number;
  cardCount: number;
}
