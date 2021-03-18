import { IonCard, IonImg } from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import { POKEMON_URL } from "../consts";
import usePokemonAPI from "../usePokemonAPI";
import { shuffleDeck, generateId } from "../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { levelDifficultySelector } from "../redux-store/level-difficulty/levelDifficulty.selector";
import {
  Card,
  fetchPokemons,
  setCardDeck,
} from "../redux-store/card-deck/cardDeck.slice";
import { cardDeckSelector } from "../redux-store/card-deck/cardDeck.selector";

interface Props {
  scorePoints: () => void;
  setGameFinished: () => void;
}

export interface Pokemon {
  name: string;
  url: string;
}

const CardDeck: React.FC<Props> = ({ scorePoints, setGameFinished }) => {
  const level = useSelector(levelDifficultySelector);
  const dispatch = useDispatch();
  const { cardState, cards: cardDeck } = useSelector(cardDeckSelector);

  useEffect(() => {
    dispatch(fetchPokemons(level.cardCount));
  }, []);

  if (cardState === "loading") {
    return <div>loading</div>;
  }

  if (cardState === "error" && cardDeck === []) {
    return <div>error</div>;
  }

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {cardDeck.map(({ id, type, isOpened, backImage, frontImage }) => (
        <IonCard
          key={id}
          className={type}
          style={{ width: "80px", height: "80px" }}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <IonImg src={frontImage} />
        </IonCard>
      ))}
    </div>
  );
};

export default CardDeck;
