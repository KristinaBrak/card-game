import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GAME_TIME_SEC } from "../consts";
import { gameSelector } from "../redux-store/game/game.selector";
import { setState } from "../redux-store/game/game.slice";

const PausedWindow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { time } = useSelector(gameSelector);
  const currentTime = new Date().getTime();
  const timeLeft =
    GAME_TIME_SEC - Math.floor((currentTime - time.startTimeMs) / 1000);

  const resumeGame = () => {
    dispatch(setState("resumed"));
    history.push("/game");
  };

  const finishGame = () => {
    dispatch(setState("finished"));
    history.push("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Paused Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle>Time remain: {timeLeft}</IonTitle>
        <IonButton onClick={resumeGame}>Return</IonButton>
        <IonButton onClick={finishGame}>Exit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PausedWindow;
