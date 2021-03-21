import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { POKEMON_URL } from "../../consts";
import { generateId, shuffleDeck } from "../../utils/helpers";
import { Card, Difficulty, Level, Pokemon } from "../game/game.types";
import { mapCard } from "../game/game.utils";

interface Game {
  gameState: "started" | "paused" | "finished";
  score: number;
  cards: Card[];
  fetchState: "successful" | "error" | "loading";
  level: Level;
}

const initialState: Game = {
  gameState: "started",
  score: 0,
  cards: [],
  fetchState: "loading",
  level: {
    name: Difficulty.EASY,
    pointValue: 5,
    timeMultiply: 1,
    cardCount: 8,
  },
};

const fetchPokemon = async (url: string): Promise<Pokemon> => {
  const pokemon = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const pokemon: Pokemon = {
        name: result.name.toString(),
        url: result.sprites.other.dream_world.front_default.toString(),
      };
      return pokemon;
    });
  return pokemon;
};

export const fetchPokemons = createAsyncThunk(
  `fetchPokemons`,
  async (cardCount: number) => {
    const array = Array.from({ length: cardCount / 2 }, (v, i) => i + 1);
    const result = await Promise.all(
      array.map((index) => fetchPokemon(`${POKEMON_URL}/${index}`))
    );
    return result;
  }
);

const generateDeck = (pokemons: Pokemon[]) => {
  const pokemonDeck = pokemons.concat(pokemons);
  const cards: Card[] = pokemonDeck.map((pokemon) => ({
    id: generateId(),
    type: pokemon.name,
    cardState: "closed",
    backImage: "../assets/backside.jpeg",
    frontImage: pokemon.url,
  }));
  const shuffledDeck = shuffleDeck(cards);
  return shuffledDeck;
};

const isCardDeckSolved = (cards: Card[]): boolean => {
  const countSolved = cards.reduce(
    (acc, card) => (card.cardState === "solved" ? acc + 1 : acc),
    0
  );
  return countSolved === cards.length;
};

const getLevelDifficultyDefinition = (difficultyName: Difficulty): Level => {
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

const { reducer: gameReducer, actions } = createSlice({
  name: "game",
  initialState,
  reducers: {
    setState: (
      state,
      { payload }: PayloadAction<"started" | "paused" | "finished">
    ) => {
      state.gameState = payload;
    },
    addScore: (state, { payload }: PayloadAction<number>) => {
      state.score = state.score + payload;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    setLevel: (state, { payload }: PayloadAction<Level["name"]>) => {
      state.level = getLevelDifficultyDefinition(payload);
    },
    setCardDeck: (state, { payload }: PayloadAction<Card[]>) => {
      state.cards = payload;
    },
    openCard: (state, { payload: cardId }: PayloadAction<Card["id"]>) => {
      console.log("opened card", cardId);
      const openCount = state.cards.reduce(
        (acc, card) => (card.cardState === "opened" ? acc + 1 : acc),
        0
      );
      if (openCount === 2) {
        const [firstCard, secondCard] = state.cards.filter(
          (card) => card.cardState === "opened"
        );
        if (firstCard.type === secondCard.type) {
          state.cards = state.cards.map((card) =>
            mapCard(card, "opened", "solved")
          );
          state.score += state.level.pointValue;
          if (isCardDeckSolved(state.cards)) {
            state.gameState = "finished";
            //add time score
          }
        } else {
          state.cards = state.cards.map((card) =>
            mapCard(card, "opened", "closed")
          );
        }
      }
      state.cards = state.cards.map((card) => {
        if (card.id === cardId && card.cardState === "closed") {
          return { ...card, cardState: "opened" };
        }
        return card;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemons.fulfilled,
      (state, { payload }: PayloadAction<Pokemon[]>) => {
        state.fetchState = "successful";
        state.cards = generateDeck(payload);
      }
    );
    builder.addCase(fetchPokemons.rejected, (state, { payload }) => {
      state.fetchState = "error";
    });
    builder.addCase(fetchPokemons.pending, (state, { payload }) => {
      state.fetchState = "loading";
    });
  },
});

export const {
  setState,
  addScore,
  resetScore,
  setLevel,
  setCardDeck,
  openCard,
} = actions;
export default gameReducer;
