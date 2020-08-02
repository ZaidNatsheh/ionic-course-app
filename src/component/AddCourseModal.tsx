import React, { useRef, useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonDatetime,
  IonText,
} from "@ionic/react";

const AddCourseModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave : (title : string, date: Date)=> void;
}> = (props) => {
  const titleRef = useRef<HTMLIonInputElement>(null);
  const dateRef = useRef<HTMLIonDatetimeElement>(null);
  const [error,setError] = useState('')

  const saveHandler = () => {
    const enteredTitle = titleRef.current!.value;
    const enteredDate = dateRef.current!.value;

    if (
      !enteredTitle ||
      !enteredDate ||
      enteredTitle.toString().trim().length === 0 ||
      enteredDate.toString().trim().length === 0
    ) {
      setError('please enter vaild data ')
      return;
    }
    setError('')
    props.onSave(enteredTitle.toString(), new Date(enteredDate))
  };

  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Course</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Course Title</IonLabel>
                <IonInput type="text" ref={titleRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Enrolment Date</IonLabel>
                <IonDatetime displayFormat="MM DD YY" ref={dateRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          {error && <IonRow>
            <IonCol className="ion-text-center" >
              <IonText color="danger">  <p >{error}</p></IonText>
        
            </IonCol>
            </IonRow>}
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={props.onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton  expand="block" color="secondary" onClick={saveHandler}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default AddCourseModal;
