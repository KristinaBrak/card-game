import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import CardDeck from "../components/CardDeck";
import PausedWindow from "../components/PausedWindow";
import "./Home.css";
import { SCORE_POINTS } from "../consts";

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [finished, setFinished] = useState(false);

  const calculateTime = () => {
    return timeLeft - 1;
  };

  const [timeLeft, setTimeLeft] = useState(60);

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

  const calculateScore = () => {
    return timeLeft * SCORE_POINTS.easy.timeMultiply + score;
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
          scorePoints={() => setScore(score + SCORE_POINTS.easy.pointValue)}
          setFinished={() => setFinished(true)}
          cardNumber={SCORE_POINTS.easy.cardNumber}
        />
        <IonButton onClick={() => setIsPaused(true)}>Pause</IonButton>
        {isPaused && <PausedWindow returnToGame={() => setIsPaused(false)} />}
      </IonContent>
    </IonPage>
  );
};

export default Game;
