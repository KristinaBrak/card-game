import { IonButton } from "@ionic/react";
import React from "react";

interface Props {
  returnToGame: () => void;
}

const PausedWindow: React.FC<Props> = ({ returnToGame }) => {
  return (
    <div>
      <h1>Paused Window</h1>
      <IonButton onClick={returnToGame}>Return</IonButton>
    </div>
  );
};

export default PausedWindow;
