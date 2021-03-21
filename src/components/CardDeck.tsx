import { IonCard, IonImg } from "@ionic/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameSelector } from "../redux-store/game/game.selector";
import { fetchPokemons, openCard } from "../redux-store/game/game.slice";
import { Card } from "../redux-store/game/game.types";

const CardDeck = () => {
  const { fetchState, cards: cardDeck, level } = useSelector(gameSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons(level.cardCount));
  }, []);

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
