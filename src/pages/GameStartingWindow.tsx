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
  changeDifficulty,
  LevelDefinition,
} from "../redux-store/level-difficulty/levelDifficulty.slice";
import {
  addUser,
  setCurrentUser,
  User,
} from "../redux-store/user/userList.slice";
import { userListSelector } from "../redux-store/user/userList.selector";

const GameStartingWindow = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const userList = useSelector(userListSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const saveCurrentUser = () => {
    const foundUser = userList.find((user) => user.name === playerName);
    if (!foundUser) {
      const newUser: User = { name: playerName, isCurrent: true };
      dispatch(addUser(newUser));
    } else {
      dispatch(setCurrentUser(playerName));
    }
  };

  const openGame = (name: LevelDefinition["name"]) => {
    dispatch(changeDifficulty(name));
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
          <IonButton onClick={() => openGame("easy")}>Easy</IonButton>
          <IonButton onClick={() => openGame("medium")}>Medium</IonButton>
          <IonButton onClick={() => openGame("hard")}>Hard</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default GameStartingWindow;
