import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { gameSelector } from "../redux-store/game/game.selector";

const LeaderBoard = () => {
  const { userList } = useSelector(gameSelector);
  const sortedUserList = [...userList].sort((a, b) => b.score - a.score);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Leader Board</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {sortedUserList.length !== 0 ? (
            sortedUserList.map((user) => (
              <IonItem key={user.name}>
                <IonLabel>{user.name}</IonLabel>
                {user.score}
              </IonItem>
            ))
          ) : (
            <IonTitle>No users played this game yet.</IonTitle>
          )}
        </IonList>
        <IonButton href="/home">Menu</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LeaderBoard;
