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
import { useHistory } from "react-router";
import { gameSelector } from "../redux-store/game/game.selector";
import {
  fetchPokemons,
  resetScore,
  setState,
} from "../redux-store/game/game.slice";

const GameOverWindow = () => {
  const { userList, level } = useSelector(gameSelector);
  const currentUser = userList.find((user) => user.isCurrent);
  const dispatch = useDispatch();
  const history = useHistory();

  const finishGame = () => {
    dispatch(setState("finished"));
    dispatch(resetScore());
    history.push("/home");
  };

  const tryAgain = () => {
    dispatch(setState("delayStarted"));
    dispatch(resetScore());
    dispatch(fetchPokemons(level.cardCount));
    history.push("/game");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" mode="ios">
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
              <IonButton onClick={finishGame}>Menu</IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton onClick={tryAgain}>Try again</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default GameOverWindow;
