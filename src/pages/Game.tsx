import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import CardDeck from "../components/CardDeck";
import Timer from "../components/Timer";
import { gameSelector } from "../redux-store/game/game.selector";
import { decrementDelay, setState } from "../redux-store/game/game.slice";
import "./Home.css";

const Game: React.FC = () => {
  const { gameState: state, score, time } = useSelector(gameSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setState("delayStarted"));
  }, []);

  useEffect(() => {
    if (state === "delayStarted" && time.delaySec >= 0) {
      const timer = setTimeout(() => {
        dispatch(decrementDelay());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    if (state === "finished") {
      history.push("/game-over");
    }
  }, [state]);

  const pauseGame = () => {
    dispatch(setState("paused"));
    history.push("/paused");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Card Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {state === "delayStarted" ? (
          <IonTitle>Game starts in: {time.delaySec}</IonTitle>
        ) : (
          <Timer />
        )}
        <IonTitle>Score: {score}</IonTitle>
        <CardDeck />
        <IonButton onClick={pauseGame} disabled={state === "delayStarted"}>
          Pause
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Game;
