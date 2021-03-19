import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../components/CardDeck";
import { POKEMON_URL } from "../../consts";
import { generateId, shuffleDeck } from "../../utils/helpers";

export interface Card {
  id: string;
  type: Pokemon["name"];
  isOpened: boolean;
  backImage: string;
  frontImage: Pokemon["url"];
}

interface CardDeck {
  cards: Card[];
  cardState: "successful" | "error" | "loading";
}

const initialState: CardDeck = {
  cards: [],
  cardState: "loading",
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
    isOpened: true,
    backImage: "../assets/backside.jpeg",
    frontImage: pokemon.url,
  }));
  const shuffledDeck = shuffleDeck(cards);
  return shuffledDeck;
};

const { reducer: cardDeckReducer, actions } = createSlice({
  name: "cardDeck",
  initialState,
  reducers: {
    setCardDeck: (state, { payload }: PayloadAction<Card[]>) => {
      state.cards = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemons.fulfilled,
      (state, { payload }: PayloadAction<Pokemon[]>) => {
        state.cardState = "successful";
        state.cards = generateDeck(payload);
      }
    );
    builder.addCase(fetchPokemons.rejected, (state, { payload }) => {
      state.cardState = "error";
    });
    builder.addCase(fetchPokemons.pending, (state, { payload }) => {
      state.cardState = "loading";
    });
  },
});

export const { setCardDeck } = actions;
export default cardDeckReducer;
