import { useEffect, useState } from "react";
import { Pokemon } from "./redux-store/game/game.types";

const usePokemonAPI = (url: string, limit: number) => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    setLoading(true);
    const array = Array.from({ length: limit }, (v, i) => i + 1);
    Promise.all(array.map((index) => fetchPokemon(`${url}/${index}`)))
      .then((result) => {
        setData(result);
        setError("");
        setLoading(false);
      })
      .catch((error: Error) => setError(error.message));
  }, []);

  return { data, error, loading };
};

export default usePokemonAPI;
