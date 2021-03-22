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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  addUser,
  initializeUsers,
  setLevel,
} from "../redux-store/game/game.slice";
import { Difficulty, Level, User } from "../redux-store/game/game.types";
import { gameSelector } from "../redux-store/game/game.selector";

const GameStartingWindow = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const { userList } = useSelector(gameSelector);
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

        <IonButton
          onClick={() => openGame(Difficulty.EASY)}
          disabled={!!!playerName}
        >
          Easy
        </IonButton>
        <IonButton
          onClick={() => openGame(Difficulty.MEDIUM)}
          disabled={!!!playerName}
        >
          Medium
        </IonButton>
        <IonButton
          onClick={() => openGame(Difficulty.HARD)}
          disabled={!!!playerName}
        >
          Hard
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GameStartingWindow;
