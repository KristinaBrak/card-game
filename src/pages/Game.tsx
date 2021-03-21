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
import { levelDifficultySelector } from "../redux-store/level-difficulty/levelDifficulty.selector";
import { timeLeftSelector } from "../redux-store/time-left/timeLeft.selector";
import { userListSelector } from "../redux-store/user/userList.selector";
import { setCurrentUserScore } from "../redux-store/user/userList.slice";
import "./Home.css";

const Game: React.FC = () => {
  const level = useSelector(levelDifficultySelector);
  const { time } = useSelector(timeLeftSelector);
  const userList = useSelector(userListSelector);
  const { gameState: state, score } = useSelector(gameSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const calculateTotalScore = () => {
    const delta = time.timeSpent;
    const result = time.timeSpent / 1000;
    console.log({ delta });
    console.log({ result });
    const timeScore = (GAME_TIME_SEC - delta) * level.timeMultiply;
    console.log({ timeScore });
    // let totalScore: number = 0;
    // if (timeScore < 0) {
    //   totalScore = score;
    // } else {
    //   totalScore = timeScore + score;
    // }
    // dispatch(setCurrentUserScore(totalScore));
    //find user, set user score to total score
  };

  useEffect(() => {
    if (state === "finished") {
      // history.push("/game-over");
      calculateTotalScore();
    }
  }, [state]);

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
