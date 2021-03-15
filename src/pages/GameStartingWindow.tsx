import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  changeDifficulty,
  LevelDefinition,
} from "../redux-store/level-difficulty/levelDifficulty.slice";

const GameStartingWindow = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  const openGame = (name: LevelDefinition["name"]) => {
    dispatch(changeDifficulty(name));
    history.push("/game");
  };

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
          <IonButton onClick={() => openGame("easy")}>Easy</IonButton>
          <IonButton onClick={() => openGame("medium")}>Medium</IonButton>
          <IonButton onClick={() => openGame("hard")}>Hard</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default GameStartingWindow;
