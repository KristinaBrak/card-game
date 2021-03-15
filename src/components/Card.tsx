import React from "react";
import { IonCard, IonImg } from "@ionic/react";

interface CardProps {
  key: string;
  children: any;
  onOpen: () => void;
  isOpened: boolean;
}

const Card: React.FC<CardProps> = ({ children, onOpen, isOpened }) => {
  return (
    <IonCard
      style={{ width: "80px", height: "80px" }}
      onClick={(event) => {
        event.preventDefault();
        onOpen();
      }}
    >
      {isOpened ? children : null}
    </IonCard>
  );
};

export default Card;
