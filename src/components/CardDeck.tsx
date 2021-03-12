import { IonCard, IonImg } from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import { CARD_COUNT, POKEMON_URL } from "../consts";
import usePokemonAPI from "../usePokemonAPI";
import Card from "./Card";
import { shuffleDeck } from "../utils/helpers";

interface Props {
  scorePoints: () => void;
}

export interface Pokemon {
  name: string;
  url: string;
}

const CardDeck: React.FC<Props> = ({ scorePoints }) => {
  const { data, loading, error } = usePokemonAPI(POKEMON_URL, CARD_COUNT / 2);
  const [pokemonDeck, setPokemonDeck] = useState<Pokemon[]>();
  const [openedCard, setOpenedCard] = useState<string|null>(null);

  useMemo(() => {
    setPokemonDeck(shuffleDeck(data.concat(data)));
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error</div>;
  }
  console.log({ data });


  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {pokemonDeck?.map(({ name, url }, index) => (
        <Card key={`${name}-${index}`} onOpen={()=>{setOpenedCard(`${name}-${index}`)}}>
          <IonImg
            src={url}
            alt={name}
            key={`${name}-${index}`}
            onClick={scorePoints}
          />
        </Card>
      ))}
    </div>
  );
};

export default CardDeck;
