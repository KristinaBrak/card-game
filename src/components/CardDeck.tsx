import { IonCard, IonImg, IonItem } from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import { POKEMON_URL } from "../consts";
import usePokemonAPI from "../usePokemonAPI";
import { shuffleDeck, generateId } from "../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { levelDifficultySelector } from "../redux-store/level-difficulty/levelDifficulty.selector";
import {
  fetchPokemons,
  openCard,
  setCardDeck,
} from "../redux-store/game/game.slice";
import { Card } from "../redux-store/game/game.types";
import { gameSelector } from "../redux-store/game/game.selector";

interface Props {
  scorePoints: () => void;
  setGameFinished: () => void;
}

const CardDeck: React.FC<Props> = ({ scorePoints, setGameFinished }) => {
  const level = useSelector(levelDifficultySelector);
  const {fetchState, cards: cardDeck } = useSelector(gameSelector);
  const dispatch = useDispatch();
  const [prevCard, setPrevCard] = useState<Card | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchPokemons(level.cardCount));
  }, []);

  const isGameFinished = () => {
    if (cardDeck.length > 0) {
      const count = cardDeck.reduce((acc, card) => {
        if (card.cardState === "solved") {
          acc += 1;
        }
        return acc;
      }, 0);
      return count === cardDeck.length;
    }
    return false;
  };

  //FIXME: put in Game
  const calculateScore = (type: Card["type"]) => {
    if (prevCard && type === prevCard.type) {
      scorePoints();
    }
  };

  const handleClick = (card: Card) => {
    dispatch(openCard(card.id));
  };

  if (fetchState === "loading") {
    return <div>loading</div>;
  }

  if (fetchState === "error" && cardDeck === []) {
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
          onClick={() => {
            handleClick(card);
          }}
        >
          {card.cardState !== "closed" ? (
            <IonImg src={card.frontImage} />
          ) : null}
        </IonCard>
      ))}
    </div>
  );
};

export default CardDeck;
