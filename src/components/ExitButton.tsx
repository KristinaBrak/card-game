import { IonButton } from "@ionic/react";
import { Plugins } from "@capacitor/core";

const ExitButton = () => {
  const { App } = Plugins;
  return <IonButton onClick={() => App.exitApp()}>Exit</IonButton>;
};

export default ExitButton;
