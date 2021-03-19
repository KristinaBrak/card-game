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
import CardDeck from "../components/CardDeck";
import PausedWindow from "../components/PausedWindow";
import Timer from "../components/Timer";
import { gameSelector } from "../redux-store/game/game.selector";
import { addScore, setState } from "../redux-store/game/game.slice";
import { levelDifficultySelector } from "../redux-store/level-difficulty/levelDifficulty.selector";
import "./Home.css";

const Game: React.FC = () => {
  const level = useSelector(levelDifficultySelector);
  const { state, score } = useSelector(gameSelector);
  const dispatch = useDispatch();

  const calculateCardScore = () => {
    dispatch(addScore(level.pointValue));
  };

  const setGameFinished = () => {
    dispatch(setState("finished"));
  };

  const pauseGame = () => {
    dispatch(setState("paused"));
  };

  const returnToGame = () => {
    dispatch(setState("started"));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Card Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Timer
          isPaused={state === "paused"}
          isFinished={state === "finished"}
          setGameFinished={setGameFinished}
        />
        <IonTitle>Score: {score}</IonTitle>
        <CardDeck
          scorePoints={calculateCardScore}
          setGameFinished={setGameFinished}
        />
        <IonButton onClick={pauseGame}>Pause</IonButton>
        {state === "paused" && <PausedWindow returnToGame={returnToGame} />}
      </IonContent>
    </IonPage>
  );
};

export default Game;
