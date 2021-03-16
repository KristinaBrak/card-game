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
import { userListSelector } from "../redux-store/user/userList.selector";

const LeaderBoard = () => {
  const userList = useSelector(userListSelector);
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
          {sortedUserList.map((user) => (
            <IonItem key={user.name}>
              <IonLabel>{user.name}</IonLabel>
              {user.score}
            </IonItem>
          ))}
        </IonList>
        <IonButton href="/home">Menu</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LeaderBoard;
