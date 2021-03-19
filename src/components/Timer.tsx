import { IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeLeftSelector } from "../redux-store/time-left/timeLeft.selector";
import { pause, resume, start } from "../redux-store/time-left/timeLeft.slice";

interface TimerProps {
  isPaused: boolean;
  isFinished: boolean;
}

const Timer: React.FC<TimerProps> = ({ isPaused, isFinished }) => {
  const gameTime = useSelector(timeLeftSelector);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number>();

  const getTimeLeft = () => {
    const time = new Date().getTime() - gameTime.startTime;
    return 63 - Math.floor(time / 1000);
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
    if (!isPaused && !isFinished) {
      const timer = setTimeout(() => {
        setTimeLeft(getTimeLeft());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  return <IonTitle>Time left: {timeLeft}</IonTitle>;
};

export default Timer;
