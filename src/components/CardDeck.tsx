import { IonCard, IonImg } from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import { CARD_COUNT, POKEMON_URL } from "../consts";
import usePokemonAPI from "../usePokemonAPI";
import Card from "./Card";
import { shuffleDeck, generateId } from "../utils/helpers";

interface Props {
  scorePoints: () => void;
}

export interface Pokemon {
  name: string;
  url: string;
}

interface Card {
  id: string;
  isOpened: boolean;
  pokemon: Pokemon;
}

const CardDeck: React.FC<Props> = ({ scorePoints }) => {
  const { data, loading, error } = usePokemonAPI(POKEMON_URL, CARD_COUNT / 2);
  const [cardDeck, setCardDeck] = useState<Card[]>();
  const [prevCardId, setPrevCardId] = useState<string | null>(null);

  useMemo(() => {
    const pokemons = data.concat(data);
    const cards: Card[] = pokemons.map((pokemon) => ({
      id: generateId(),
      isOpened: false,
      pokemon,
    }));
    setCardDeck(shuffleDeck(cards));
  }, [data]);

  const calculateScore = () => {
    scorePoints();
  };

  const turnOverCard = (id: string) => {
    const updatedDeck = cardDeck?.map((card) =>
      card.id === id ? { ...card, isOpened: !card.isOpened } : card
    );
    setCardDeck(updatedDeck);
  };

  const turnOverCards = (id1: string, id2?: string) => {
    const updatedDeck = cardDeck?.map((card) =>
      card.id === id1 ? { ...card, isOpened: !card.isOpened } : card
    );
    const secUpdatedDeck = cardDeck?.map((card) =>
      card.id === id2 ? { ...card, isOpened: !card.isOpened } : card
    );
    setCardDeck(secUpdatedDeck);
  };

  const areCardsMatching = (id: string): boolean => {
    const secondCard = cardDeck?.find(
      (card) => card.id === id && card.isOpened
    );
    const firstCard = cardDeck?.find(
      (card) => card.id === prevCardId && card.isOpened
    );
    if (firstCard && secondCard) {
      return firstCard.pokemon.name === secondCard.pokemon.name;
    }
    return false;
  };

  const handleCardOpen = (id: string) => {
    turnOverCard(id);
    if (prevCardId) {
      console.log("secondCard", id);
      if (!areCardsMatching(id)) {
        console.log("not maching");
        turnOverCards(id, prevCardId);
      } else {
        calculateScore();
        console.log("match");
      }

      setPrevCardId(null);
    } else {
      console.log("firstCard", id);
      setPrevCardId(id);
    }
    // if (!openedCardId) {
    //   setOpenedCardId(id);
    // } else {
    //   if (areCardsMatching(id)) {
    //     console.log("matching");
    //     calculateScore();
    //   } else {
    //     console.log("not matching");
    //     setOpenedCardId(null);
    //   }
    //   turnOverCard(openedCardId);
    //   turnOverCard(id);
    // }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error</div>;
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
      {/* {pokemonDeck?.map(({ name, url }, index) => (
        <Card
          key={`${name}-${index}`}
          onOpen={() => {
            setOpenedCard(`${name}-${index}`);
          }}
        >
          <IonImg
            src={url}
            alt={name}
            key={`${name}-${index}`}
            onClick={scorePoints}
          />
        </Card>
      ))} */}
      {cardDeck?.map(({ id, isOpened, pokemon: { url } }) => (
        <Card
          key={id}
          onOpen={() => {
            handleCardOpen(id);
          }}
          isOpened={isOpened}
        >
          <IonImg src={url} key={id} />
        </Card>
      ))}
    </div>
  );
};

export default CardDeck;
