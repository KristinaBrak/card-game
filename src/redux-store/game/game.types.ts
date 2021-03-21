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

interface CardDeck {
  cards: Card[];
  cardState: "successful" | "error" | "loading";
}
