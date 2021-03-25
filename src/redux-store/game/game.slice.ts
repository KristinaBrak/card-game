import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CARD_BACKSIDE_URL,
  DELAY_TIME_SEC,
  GAME_TIME_SEC,
  POKEMON_URL,
} from "../../consts";
import { generateId, shuffleDeck } from "../../utils/helpers";
import {
  Card,
  Difficulty,
  Level,
  Pokemon,
  TimeLeft,
  User,
} from "../game/game.types";
import { mapCard, roundTime } from "../game/game.utils";

interface Game {
  gameState: "delayStarted" | "started" | "paused" | "resumed" | "finished";
  score: number;
  cards: Card[];
  fetchState: "successful" | "error" | "loading";
  level: Level;
  time: TimeLeft;
  userList: User[];
}

const initialState: Game = {
  gameState: "paused",
  score: 0,
  cards: [],
  fetchState: "loading",
  level: {
    name: Difficulty.EASY,
    pointValue: 5,
    timeMultiply: 1,
    cardCount: 8,
  },
  time: {
    startTimeMs: 0,
    timeSpentMs: 0,
    delaySec: DELAY_TIME_SEC,
  },
  userList: [],
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
    cardState: "opened",
    backImage: CARD_BACKSIDE_URL,
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
    setState: (state, { payload }: PayloadAction<Game["gameState"]>) => {
      state.gameState = payload;
      switch (payload) {
        case "delayStarted":
          state.time.delaySec = DELAY_TIME_SEC;
          state.cards = state.cards.map((card) =>
            mapCard(card, "closed", "opened")
          );
          return;
        case "started":
          state.time.startTimeMs = 0;
          state.time.timeSpentMs = 0;
          const startTime = new Date().getTime();
          state.time.startTimeMs = roundTime(startTime);
          state.score = 0;
          state.cards = state.cards.map((card) =>
            mapCard(card, "opened", "closed")
          );
          return;
        case "paused":
          const currentPausedTime = new Date().getTime();
          state.time.timeSpentMs = roundTime(
            currentPausedTime - state.time.startTimeMs
          );
          return;
        case "resumed":
          const currentTime = new Date().getTime();
          state.time.startTimeMs = roundTime(
            currentTime - state.time.timeSpentMs
          );
          state.time.timeSpentMs = 0;
          return;
        case "finished":
          const result = roundTime(new Date().getTime());
          state.time.timeSpentMs = result - state.time.startTimeMs;
          return;
        default:
          return;
      }
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
            const timeSpent =
              roundTime(new Date().getTime()) - state.time.startTimeMs;
            state.time.timeSpentMs = timeSpent;
            const timeResult =
              (GAME_TIME_SEC - timeSpent / 1000) * state.level.pointValue;
            state.score += timeResult;
            const updatedUserList = state.userList.map((user) =>
              user.isCurrent ? { ...user, score: state.score } : user
            );
            state.userList = updatedUserList;
            localStorage.setItem("userList", JSON.stringify(updatedUserList));
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
    addUser: (state, { payload }: PayloadAction<User["name"]>) => {
      const foundUser = state.userList.find((user) => user.name === payload);
      if (!foundUser) {
        const newUser = {
          name: payload,
          isCurrent: true,
          score: 0,
        };
        const updatedList: User[] = state.userList.map((user) => ({
          ...user,
          isCurrent: false,
        }));
        updatedList.push(newUser);
        state.userList = updatedList;
        localStorage.setItem("userList", JSON.stringify(updatedList));
      } else {
        const updatedUserList = state.userList.map((user) =>
          user.name === payload
            ? { ...user, isCurrent: true }
            : { ...user, isCurrent: false }
        );
        state.userList = updatedUserList;
        localStorage.setItem("userList", JSON.stringify(updatedUserList));
      }
    },
    initializeUsers: (state) => {
      const foundUsers = localStorage.getItem("userList");
      if (!foundUsers) {
        localStorage.setItem("userList", JSON.stringify([]));
      }
      const users: User[] = JSON.parse(localStorage.getItem("userList")!);
      state.userList = users;
    },
    decrementDelay: (state) => {
      state.time.delaySec = state.time.delaySec - 1;
      if (state.time.delaySec <= 0) {
        state.cards = state.cards.map((card) =>
          mapCard(card, "opened", "closed")
        );
        const startTime = new Date().getTime();
        state.time.startTimeMs = roundTime(startTime);
        state.score = 0;
        state.gameState = "started";
      }
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
  addUser,
  initializeUsers,
  decrementDelay,
} = actions;
export default gameReducer;
