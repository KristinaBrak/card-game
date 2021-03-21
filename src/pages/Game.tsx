import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import CardDeck from "../components/CardDeck";
import PausedWindow from "../components/PausedWindow";
import Timer from "../components/Timer";
import { gameSelector } from "../redux-store/game/game.selector";
import { setState } from "../redux-store/game/game.slice";
import "./Home.css";

const Game: React.FC = () => {
  const { gameState: state, score } = useSelector(gameSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setState("started"));
  }, []);

  useEffect(() => {
    if (state === "finished") {
      history.push("/game-over");
    }
  }, [state]);

  const pauseGame = () => {
    dispatch(setState("paused"));
  };

  const returnToGame = () => {
    dispatch(setState("resumed"));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Card Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Timer />
        <IonTitle>Score: {score}</IonTitle>
        <CardDeck />
        <IonButton onClick={pauseGame}>Pause</IonButton>
        {state === "paused" && <PausedWindow returnToGame={returnToGame} />}
      </IonContent>
    </IonPage>
  );
};

export default Game;
