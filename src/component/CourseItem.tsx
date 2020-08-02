import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
} from "@ionic/react";
const CourseItem: React.FC<{
  title: string;
  enrolmentDate: Date;
  id: string;
}> = (props) => {
  return (
    <IonCard className="ion-no-margin-bottom">
      <IonCardHeader>
        <IonCardTitle>{props.title}</IonCardTitle>
        <IonCardSubtitle>Enrolled on :{props.enrolmentDate}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="ion-text-right">
          <IonButton
            fill="clear"
            color="secondary"
            routerLink={`/courses/${props.id}`}
          >
            View Course Goals
          </IonButton>
        </div>{" "}
      </IonCardContent>
    </IonCard>
  );
};

export default CourseItem;
