import { IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELAY_TIME_SEC, GAME_TIME_SEC } from "../consts";
import { timeLeftSelector } from "../redux-store/time-left/timeLeft.selector";
import {
  pause,
  resume,
  start,
  stop,
} from "../redux-store/time-left/timeLeft.slice";

interface TimerProps {
  isPaused: boolean;
  isFinished: boolean;
  setGameFinished: () => void;
}

const Timer: React.FC<TimerProps> = ({
  isPaused,
  isFinished,
  setGameFinished,
}) => {
  const gameTime = useSelector(timeLeftSelector);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number>();

  const getTimeLeft = () => {
    const time = new Date().getTime() - gameTime.time.startTime;
    return 60 - Math.floor(time / 1000);
  };

  useEffect(() => {
    dispatch(start());
  }, []);

  useEffect(() => {
    if (isPaused) {
      dispatch(pause());
    } else {
      dispatch(resume());
    }
  }, [isPaused]);

  useEffect(() => {
    if (isFinished) {
      dispatch(stop());
    }
  }, [isFinished]);

  useEffect(() => {
    if (!isPaused && !isFinished) {
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
      dispatch(stop());
      setGameFinished();
    }
  }, [timeLeft]);

  return <IonTitle>Time left: {timeLeft}</IonTitle>;
};

export default Timer;
