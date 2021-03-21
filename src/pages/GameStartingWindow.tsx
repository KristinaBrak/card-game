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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  addUser,
  setCurrentUser,
  setLevel,
} from "../redux-store/game/game.slice";
import { Difficulty, Level, User } from "../redux-store/game/game.types";
import { gameSelector } from "../redux-store/game/game.selector";

const GameStartingWindow = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const { userList } = useSelector(gameSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const saveCurrentUser = () => {
    const foundUser = userList.find((user) => user.name === playerName);
    if (!foundUser) {
      const newUser: User = { name: playerName, isCurrent: true, score: 0 };
      dispatch(addUser(newUser));
    } else {
      dispatch(setCurrentUser(playerName));
    }
  };

  const openGame = (name: Level["name"]) => {
    dispatch(setLevel(name));
    saveCurrentUser();
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
          <IonButton onClick={() => openGame(Difficulty.EASY)}>Easy</IonButton>
          <IonButton onClick={() => openGame(Difficulty.MEDIUM)}>
            Medium
          </IonButton>
          <IonButton onClick={() => openGame(Difficulty.HARD)}>Hard</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default GameStartingWindow;
