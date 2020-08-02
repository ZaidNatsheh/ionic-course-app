import React, { useRef, useState } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonModal,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
} from "@ionic/react";
const EditModal: React.FC<{
  show: boolean;
  onCancel: () => void;
  onSave: (goalText: string) => void;
  editedGoal: { id: string; text: string } | null;
}> = (props) => {
  const textRef = useRef<HTMLIonInputElement>(null);
  const [errorMassage, setErrorMassage] = useState("");

  const saveHandler = () => {
    const enteredText = textRef.current!.value;
    if (!enteredText || enteredText.toString().length === 0) {
      setErrorMassage("Plese Enter a valid text");
      return;
    }
    setErrorMassage('');
    props.onSave(enteredText.toString());
 
  };
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.editedGoal ? "Edit" : "Add"} Goal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Goal</IonLabel>
                <IonInput
                  type="text"
                  value={props.editedGoal?.text}
                  ref={textRef}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          {errorMassage && (
            <IonRow>
              <IonCol className="ion-text-center">
                <IonText color="danger">
                  <p>{errorMassage}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={props.onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="secondary" expand="block" onClick={saveHandler}>
                save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default EditModal;
