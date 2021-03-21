import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameSelector } from "../redux-store/game/game.selector";
import { resetScore, setState } from "../redux-store/game/game.slice";

const GameOverWindow = () => {
  const { userList } = useSelector(gameSelector);
  const currentUser = userList.find((user) => user.isCurrent);
  const dispatch = useDispatch();

  const finishGame = () => {
    dispatch(setState("finished"));
    dispatch(resetScore());
  };

  const tryAgain = () => {
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
              <IonButton href="/leader-board" onClick={finishGame}>
                Leader Board
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton href="/home" onClick={finishGame}>
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
