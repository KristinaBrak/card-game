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
import { GAME_TIME_SEC } from "../consts";
import { gameSelector } from "../redux-store/game/game.selector";
import { addScore, setState } from "../redux-store/game/game.slice";
import { Card } from "../redux-store/game/game.types";
import { userListSelector } from "../redux-store/user/userList.selector";
import { setCurrentUserScore } from "../redux-store/user/userList.slice";
import "./Home.css";

const Game: React.FC = () => {
  const userList = useSelector(userListSelector);
  const { gameState: state, score, level, time } = useSelector(gameSelector);
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

  const setGameFinished = () => {
    dispatch(setState("finished"));
  };

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
        <Timer/>
        <IonTitle>Score: {score}</IonTitle>
        <CardDeck />
        <IonButton onClick={pauseGame}>Pause</IonButton>
        {state === "paused" && <PausedWindow returnToGame={returnToGame} />}
      </IonContent>
    </IonPage>
  );
};

export default Game;
