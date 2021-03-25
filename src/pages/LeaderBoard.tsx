import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { User } from "../redux-store/game/game.types";
import { menu } from "ionicons/icons";

const LeaderBoard = () => {
  if (!localStorage.getItem("userList")) {
    localStorage.setItem("userList", JSON.stringify([]));
  }
  const userList: User[] = JSON.parse(localStorage.getItem("userList") ?? "");
  const sortedUserList = [...userList].sort((a, b) => b.score - a.score);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="medium">
          <IonTitle color="light" class="ion-text-center">
            Leader Board
          </IonTitle>
          <IonButtons slot="end">
            <IonButton href="/home">
              <IonIcon slot="icon-only" icon={menu} color="light" />
            </IonButton>
          </IonButtons>
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
      </IonContent>
    </IonPage>
  );
};

export default LeaderBoard;
