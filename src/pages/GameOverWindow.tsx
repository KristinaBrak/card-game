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
import { userListSelector } from "../redux-store/user/userList.selector";

const GameOverWindow = () => {
  const userList = useSelector(userListSelector);
  const currentUser = userList.find((user) => user.isCurrent);
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
              <IonButton href="/leader-board">Leader Board</IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton href="/home">Menu</IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton href="/game">Try again</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default GameOverWindow;
