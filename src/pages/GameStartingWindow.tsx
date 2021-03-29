import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  addUser,
  initializeUsers,
  setLevel,
} from "../redux-store/game/game.slice";
import { Difficulty, Level } from "../redux-store/game/game.types";
import "./GameStartingWindow.css";

const GameStartingWindow = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const saveCurrentUser = () => {
    dispatch(addUser(playerName));
  };

  const openGame = (name: Level["name"]) => {
    dispatch(setLevel(name));
    saveCurrentUser();
    history.push("/game");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="medium" mode="ios">
          <IonTitle class="ion-text-center" color="light">
            Card Game
          </IonTitle>
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
        <div className="level-buttons">
          <IonButton
            onClick={() => openGame(Difficulty.EASY)}
            disabled={!playerName}
            color="light"
          >
            <IonText color="dark">Easy</IonText>
          </IonButton>
          <IonButton
            onClick={() => openGame(Difficulty.MEDIUM)}
            disabled={!playerName}
            color="light"
          >
            <IonText color="dark">Medium</IonText>
          </IonButton>
          <IonButton
            onClick={() => openGame(Difficulty.HARD)}
            disabled={!playerName}
            color="light"
          >
            <IonText color="dark">Hard</IonText>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GameStartingWindow;
