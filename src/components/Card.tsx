import React from "react";
import { IonCard, IonImg } from "@ionic/react";

interface CardProps {
  key: string;
  children: any;
  onOpen: () => void;
}

const Card: React.FC<CardProps> = ({ key, children, onOpen }) => {
  return (
    <IonCard
      key={key}
      style={{ width: "80px", height: "80px" }}
      onClick={onOpen}
    >
      {children}
    </IonCard>
  );
};

export default Card;
