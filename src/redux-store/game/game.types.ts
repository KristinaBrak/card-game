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

export interface TimeLeft {
  startTime: number;
  timeSpent: number;
}

export interface User {
  name: string;
  isCurrent: boolean;
  score: number;
}

export interface UserList {
  userList: User[];
}
