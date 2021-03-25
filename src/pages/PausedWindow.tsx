import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardTitle,
} from "@ionic/react";
import { arrowBack, close } from "ionicons/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GAME_TIME_SEC } from "../consts";
import { gameSelector } from "../redux-store/game/game.selector";
import { setState } from "../redux-store/game/game.slice";

const PausedWindow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { time } = useSelector(gameSelector);
  const currentTime = new Date().getTime();
  const timeLeft =
    GAME_TIME_SEC - Math.floor((currentTime - time.startTimeMs) / 1000);

  const resumeGame = () => {
    dispatch(setState("resumed"));
    history.push("/game");
  };

  const quitGame = () => {
    dispatch(setState("finished"));
    history.push("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios" color="medium">
          <IonButtons slot="start">
            <IonButton onClick={resumeGame}>
              <IonIcon
                slot="icon-only"
                icon={arrowBack}
                size="large"
                color="secondary"
              />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={quitGame}>
              <IonIcon
                slot="icon-only"
                icon={close}
                size="large"
                color="secondary"
              />
            </IonButton>
          </IonButtons>
          <IonTitle color="light">Pause</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardSubtitle class="ion-text-center" color="dark">
              Time remain
            </IonCardSubtitle>
            <IonCardTitle class="ion-text-center" color="dark">
              {timeLeft}
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PausedWindow;
