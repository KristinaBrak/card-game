import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { timeLeftSelector } from "../redux-store/time-left/timeLeft.selector";

interface TimerProps {
  isPaused: boolean;
  isFinished: boolean;
}

const Timer: React.FC<TimerProps> = ({ isPaused, isFinished }) => {
  const gameTimeLeft = useSelector(timeLeftSelector);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(gameTimeLeft);

  const decrementTime = () => {
    return timeLeft - 1;
  };

  useEffect(() => {
    if (!isPaused && !isFinished) {
      const timer = setTimeout(() => {
        setTimeLeft(decrementTime());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    if (isPaused || isFinished) {
      dispatch(setTimeLeft(timeLeft));
    }
  }, [isPaused, isFinished]);

  return <IonTitle>Time left: {timeLeft}</IonTitle>;
};

export default Timer;
