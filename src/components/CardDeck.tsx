import { IonCard, IonImg, IonItem } from "@ionic/react";
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

export interface Pokemon {
  name: string;
  url: string;
}

interface Props {
  scorePoints: () => void;
  setGameFinished: () => void;
}

const CardDeck: React.FC<Props> = ({ scorePoints, setGameFinished }) => {
  const level = useSelector(levelDifficultySelector);
  const { cardState, cards: cardDeck } = useSelector(cardDeckSelector);
  const dispatch = useDispatch();
  const [prevCard, setPrevCard] = useState<Card | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchPokemons(level.cardCount));
  }, []);

  const calculateScore = (id: Card["id"], type: Card["type"]) => {
    if (prevCard && type === prevCard.type) {
      scorePoints();
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLIonCardElement, MouseEvent>,
    card: Card
  ) => {
    event.preventDefault();
    if (!prevCard) {
      setPrevCard(card);
    } else {
      calculateScore(card.id, card.type);
      setPrevCard(undefined);
    }
  };

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
      {cardDeck.map((card) => (
        <IonCard
          key={card.id}
          style={{ width: "80px", height: "80px" }}
          onClick={(event) => {
            handleClick(event, card);
          }}
        >
          <IonImg src={card.frontImage} />
        </IonCard>
      ))}
    </div>
  );
};

export default CardDeck;
