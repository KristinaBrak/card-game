import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetScore, setState } from "../redux-store/game/game.slice";
import { timeLeftSelector } from "../redux-store/time-left/timeLeft.selector";
import { reset } from "../redux-store/time-left/timeLeft.slice";
import { userListSelector } from "../redux-store/user/userList.selector";
import { resetCurrentUser } from "../redux-store/user/userList.slice";

const GameOverWindow = () => {
  const { userList } = useSelector(userListSelector);
  const currentUser = userList.find((user) => user.isCurrent);
  const dispatch = useDispatch();

  const resetGame = () => {
    dispatch(resetCurrentUser());
    dispatch(reset());
    dispatch(setState("started"));
    dispatch(resetScore());
  };
  const tryAgain = () => {
    dispatch(reset());
    dispatch(setState("started"));
    dispatch(resetScore());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Game Over</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-text-center">
        {currentUser && (
          <>
            <IonTitle key={currentUser.name}>{currentUser.name}</IonTitle>
            <IonTitle>{currentUser.score}</IonTitle>
          </>
        )}
        <IonGrid>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton href="/leader-board" onClick={resetGame}>
                Leader Board
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton href="/home" onClick={resetGame}>
                Menu
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton href="/game" onClick={tryAgain}>
                Try again
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default GameOverWindow;
