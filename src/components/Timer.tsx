import { IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GAME_TIME_SEC } from "../consts";
import { gameSelector } from "../redux-store/game/game.selector";
import { setState } from "../redux-store/game/game.slice";

const Timer = () => {
  const { time, gameState } = useSelector(gameSelector);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number>();

  const getTimeLeft = () => {
    const timeLeft = new Date().getTime() - time.startTime;
    return GAME_TIME_SEC - Math.floor(timeLeft / 1000);
  };

  useEffect(() => {
    if (gameState !== "paused" && gameState !== "finished") {
      const timer = setTimeout(() => {
        setTimeLeft(getTimeLeft());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    if (timeLeft && timeLeft <= 0) {
      dispatch(setState("finished"));
    }
  }, [timeLeft]);

  return <IonTitle>Time left: {timeLeft}</IonTitle>;
};

export default Timer;
