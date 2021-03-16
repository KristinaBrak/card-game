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
import { levelDifficultySelector } from "../redux-store/level-difficulty/levelDifficulty.selector";
import { timeLeftSelector } from "../redux-store/time-left/timeLeft.selector";
import CardDeck from "../components/CardDeck";
import PausedWindow from "../components/PausedWindow";
import "./Home.css";
import { fileURLToPath } from "url";

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const level = useSelector(levelDifficultySelector);
  const gameTimeLeft = useSelector(timeLeftSelector);
  const dispatch = useDispatch();

  const calculateTime = () => {
    return timeLeft - 1;
  };

  const [timeLeft, setTimeLeft] = useState(gameTimeLeft);

  useEffect(() => {
    if (!isPaused && !finished) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTime());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  const pauseGame = () => {
    setIsPaused(true);
    dispatch(setTimeLeft(timeLeft));
  };

  const calculateScore = () => {
    return timeLeft * level.timeMultiply + score;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Card Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle>Time left: {timeLeft}s</IonTitle>
        <IonTitle>Score: {score}</IonTitle>
        <CardDeck
          scorePoints={() => setScore(score + level.pointValue)}
          setFinished={() => setFinished(true)}
          cardNumber={level.cardCount}
        />
        <IonButton onClick={() => setIsPaused(true)}>Pause</IonButton>
        {isPaused && <PausedWindow returnToGame={() => setIsPaused(false)} />}
      </IonContent>
    </IonPage>
  );
};

export default Game;
