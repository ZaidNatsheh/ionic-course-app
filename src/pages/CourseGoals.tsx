import React, { useState, useRef, useContext } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonList,
  IonButton,
  IonIcon,
  IonFabButton,
  IonFab,
  isPlatform,
  IonAlert,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useParams } from "react-router-dom";
import EditModal from "../component/EditModal"
import EditableGoalItem from "../component/EditableGoalItem"
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CourseContext from "../data/courses-context";

const GET_COURSE_GOALS = gql`
  query coursegoal($id: uuid!) {
    goals(where: { course_id: { _eq: $id } }) {
      id
      text
      course_id
      course {
        id
        title
      }
    }
  }
`;

const CourseGoals :any  = () => {
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>();
  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);
  const selectedGoalIdRef = useRef<string | null>(null);

  const courseCtx = useContext(CourseContext);
  const selectedCourseId = useParams<{ courseId: string }>().courseId;
 
  const { loading, error, data } = useQuery(GET_COURSE_GOALS, {
    variables: { id: selectedCourseId },
    pollInterval: 100
  });

  const saveGoalHandler = (text: string) => {
    if(selectedGoal){
      console.log(selectedGoal.id,selectedCourseId);
      console.log(text);
      courseCtx.updateGoal(selectedCourseId,selectedGoal.id,text)
    }else{

      courseCtx.addGoal(selectedCourseId, text);
    }

   setIsEditing(false);
  };
  

  const startDeleteGoalHandler = (goalId:string) => {
      setToastMessage("");
    setStartedDeleting(true);
    selectedGoalIdRef.current =goalId;
  };

  const deleteGoalHandler = () => {
    setStartedDeleting(false);
    console.log("selectedCourseId ** : ",selectedCourseId);
    console.log("selectedGoalIdRef.current! **",selectedGoalIdRef.current!);
     courseCtx.deleteGoal( selectedGoalIdRef.current!,selectedCourseId)
    setToastMessage("Goal Delteted");
  };
  const startEditGoalHandler = (goalId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    slidingOptionRef.current?.closeOpened();
    const goal = data?.goals.find((g: any) => g.id === goalId);
    if (!goal) {
      return;
    }
    setIsEditing(true);
    setSelectedGoal(goal);
  };

  const startAddGoalHandler = () => {
    setIsEditing(true);
    setSelectedGoal(null);
  };
  const cancelEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedGoal(null);
  };

  if (loading) {
    return  <div className="spin">
    <IonSpinner  className="ion-spinner" color="medium"   />
 </div>  }
  if (error) {
     return `Error! ${error}`;
    // return <div>Error...</div>;

  }
  const selectedCourse = data.goals
    .map((j: any) => j.course)
    .map((f: any) => f.title)
    .find((e: any) => true);


  return (
    <React.Fragment>
      <EditModal
        show={isEditing}
        onCancel={cancelEditGoalHandler}
        editedGoal={selectedGoal}
        onSave={saveGoalHandler}
      />
      <IonToast
        isOpen={!!toastMessage}
        duration={2000}
        message={toastMessage}
       
      />
      <IonAlert
        isOpen={startedDeleting}
        header="Are You Sure ?"
        message="Do you want to delete a goal?"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setStartedDeleting(false);
            },
          },
          {
            text: "Yes",
            handler: deleteGoalHandler,
          },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/courses/list" />
            </IonButtons>
            <IonTitle>
              {selectedCourse ? selectedCourse : "No Course Found"}
            </IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={startAddGoalHandler}>
                  <IonIcon slot="icon-only" icon={add} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          { selectedCourse && (<IonList>
            {data.goals.map((goal: any) => (
              <EditableGoalItem
                key={goal.id}
                slidingRef={slidingOptionRef}
                text={goal.text}
                onStartDelete={startDeleteGoalHandler.bind(null,goal.id)}
                onStartEdit={startEditGoalHandler.bind(null, goal.id)}
              />
            ))}
          </IonList>)}
          
          {isPlatform("android") && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddGoalHandler}>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default CourseGoals;
