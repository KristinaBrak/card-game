import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { pause } from "ionicons/icons";
import React, { useEffect } from "react";
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
        <IonToolbar mode="ios" color="medium">
          <IonTitle class="ion-text-center" color="light">
            Score: {score}
          </IonTitle>
          <IonButtons slot="end" color="primary">
            <IonButton onClick={pauseGame} disabled={state === "delayStarted"}>
              <IonIcon
                slot="icon-only"
                icon={pause}
                color="primary"
                size="large"
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {state === "delayStarted" ? (
          <IonTitle class="ion-text-center" color="primary">
            Game starts in: {time.delaySec}
          </IonTitle>
        ) : (
          <Timer />
        )}

        <CardDeck />
      </IonContent>
    </IonPage>
  );
};

export default Game;
