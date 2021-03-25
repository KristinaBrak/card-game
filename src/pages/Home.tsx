import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import "./Home.css";
import ExitButton from "../components/ExitButton";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="medium">
          <IonTitle class="ion-text-center" color="light">
            Card Game
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="buttons">
          <IonButton href="/game-start" color="light">
            <IonText color="dark">Play</IonText>
          </IonButton>
          <IonButton href="/leader-board" color="light">
            <IonText color="dark">Leader Board</IonText>
          </IonButton>
          <ExitButton />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
