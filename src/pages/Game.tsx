import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeLeftSelector } from "../redux-store/time-left/timeLeft.selector";
import { levelDifficultySelector } from "../redux-store/level-difficulty/levelDifficulty.selector";
import CardDeck from "../components/CardDeck";
import PausedWindow from "../components/PausedWindow";
import "./Home.css";
import Timer from "../components/Timer";
import usePokemonAPI from "../usePokemonAPI";
import { POKEMON_URL } from "../consts";
import { cardDeckSelector } from "../redux-store/card-deck/cardDeck.selector";
import {
  Card,
  fetchPokemons,
  setCardDeck,
} from "../redux-store/card-deck/cardDeck.slice";
import { generateId, shuffleDeck } from "../utils/helpers";

const Game: React.FC = () => {
  const level = useSelector(levelDifficultySelector);

  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [finished, setFinished] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Card Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <Timer isPaused={isPaused} isFinished={finished} /> */}
        <IonTitle>Score: {score}</IonTitle>
        <CardDeck
          scorePoints={() => setScore(score + level.pointValue)}
          setGameFinished={() => setFinished(true)}
        />
        <IonButton onClick={() => setIsPaused(true)}>Pause</IonButton>
        {isPaused && <PausedWindow returnToGame={() => setIsPaused(false)} />}
      </IonContent>
    </IonPage>
  );
};

export default Game;
