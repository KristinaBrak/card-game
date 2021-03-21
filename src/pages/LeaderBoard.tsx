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
import { User } from "../redux-store/game/game.types";

const LeaderBoard = () => {
  if (!localStorage.getItem("userList")) {
    localStorage.setItem("userList", JSON.stringify([]));
  }
  const userList: User[] = JSON.parse(localStorage.getItem("userList") ?? "");
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
          {sortedUserList.length !== 0 && sortedUserList ? (
            sortedUserList.map((user) => (
              <IonItem key={user.name}>
                <IonLabel>{user.name}</IonLabel>
                {user.score}
              </IonItem>
            ))
          ) : (
            <IonTitle>No scores yet.</IonTitle>
          )}
        </IonList>
        <IonButton href="/home">Menu</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LeaderBoard;
