import { IonButton, IonText } from "@ionic/react";
import { Plugins } from "@capacitor/core";

const ExitButton = () => {
  const { App } = Plugins;
  return (
    <IonButton onClick={() => App.exitApp()} color="light">
      <IonText color="dark">Exit</IonText>
    </IonButton>
  );
};

export default ExitButton;
