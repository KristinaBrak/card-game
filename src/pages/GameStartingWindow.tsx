import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";

const GameStartingWindow = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Card Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonInput
            type="text"
            placeholder="Enter Name"
            onIonChange={(event) => setPlayerName(event.detail.value!)}
          />
        </IonItem>
        <IonItem disabled={!!!playerName}>
          <IonButton onClick={() => setDifficulty("easy")} href="/game">
            Easy
          </IonButton>
          <IonButton onClick={() => setDifficulty("medium")} href="/game">
            Medium
          </IonButton>
          <IonButton onClick={() => setDifficulty("hard")} href="/game">
            Hard
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default GameStartingWindow;
