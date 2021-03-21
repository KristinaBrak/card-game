import { Card } from "../game/game.types";

export const mapCard = (
  card: Card,
  from: "closed" | "opened" | "solved",
  to: "closed" | "opened" | "solved"
) => {
  return card.cardState === from ? { ...card, cardState: to } : card;
};
