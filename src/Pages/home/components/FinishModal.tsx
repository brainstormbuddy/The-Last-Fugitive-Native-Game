import {
  IonButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { star, menu, refresh, arrowForward } from "ionicons/icons";
import React, { useRef } from "react";

interface Props{
  FinishModal:{
  isWon: boolean;
  moves: number;
  score: number;
  stars?: 1|2|3;
  }
  TextProps:{
    label:string,
    value:number
    color:string
  }
  IconsProps:{
    stars: 0|1|2|3;
  }
}

const FinishModal: React.FC<Props["FinishModal"]> = ({ isWon, moves, score, stars }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const data = {
    title: isWon ? "Victory" : "Lost",
    color: isWon ? "var(--ion-color-success)" : "var(--ion-color-danger)",
  };
  
  return (
    <IonModal id="finish-modal" ref={modal} trigger="open-finish-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{data.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="finish-modal__body">
        <FinishIcons stars={stars || 0}/>
        <h2 style={{color:data.color}}>Level 10</h2>
        <ModalText label={"Moves"} value={moves} color={data.color} />
        <ModalText label={"Score"} value={score} color={data.color} />
        <div className="finish-modal__button-container">
          <IonButton fill="outline">
            <IonIcon slot="icon-only" icon={menu} color="warning" />
          </IonButton>
          <IonButton fill="outline">
            <IonIcon slot="icon-only" icon={refresh} color="warning"/>
          </IonButton>
          <IonButton fill="outline">
            <IonIcon slot="icon-only" icon={arrowForward} color="warning"/>
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default FinishModal;



const FinishIcons: React.FC<Props["IconsProps"]> = ({ stars }) => {
  const starsToRender = [...Array(3)].map((s, i) => {
      if (i < stars) {
        return <IonIcon key={i} icon={star} color="warning" />;
      }
      return <IonIcon key={i} icon={star} />;
    })

  return (
    <>
      <div className="finish-modal__icons">
        {starsToRender}
        </div>
    </>
  );
};


const ModalText: React.FC<Props["TextProps"]> = ({label,value,color}) => {
  return (
    <div className="text-container">
      <span className="modal-text__label">{label}</span>
      <span className="modal-text__value" style={{color:color}}>{value}</span>
    </div>
  )
}