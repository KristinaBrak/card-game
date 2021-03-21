import { Card } from "../game/game.types";

export const mapCard = (
  card: Card,
  from: "closed" | "opened" | "solved",
  to: "closed" | "opened" | "solved"
) => {
  return card.cardState === from ? { ...card, cardState: to } : card;
};

export const roundTime = (timeMs: number) => {
  return Math.floor(timeMs / 1000) * 1000;
};
