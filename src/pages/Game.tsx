import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import CardDeck from "../components/CardDeck";
import PausedWindow from "../components/PausedWindow";

import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Card Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle>Score: {score}</IonTitle>
        <CardDeck scorePoints={() => setScore(score + 1)} />
        <IonButton onClick={() => setIsPaused(true)}>Pause</IonButton>
        {isPaused && <PausedWindow returnToGame={() => setIsPaused(false)} />}
      </IonContent>
    </IonPage>
  );
};

export default Game;
