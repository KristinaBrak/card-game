import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import ExitButton from "../components/ExitButton";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Card Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton href="/game-start">Play</IonButton>
        <IonButton href="/leader-board">Leader Board</IonButton>
        <ExitButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
