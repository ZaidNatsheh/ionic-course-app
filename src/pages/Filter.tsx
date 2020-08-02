import React, { useContext } from "react";
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonList,
  IonLabel,
  IonToggle,
  IonSpinner,
} from "@ionic/react";
import CourseContext from "../data/courses-context";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_COURSES = gql`
query myQuery {
  courses(order_by: {title: asc}) {
    id
    title
    enrolled
    isIncluded
  }
}

`;
const Filter: any = () => {
  const coursesCtx = useContext(CourseContext);

  const { data, error, loading  } = useQuery(GET_COURSES,{
    pollInterval : 100
  });
  const courseFilterChangeHandler = (event: CustomEvent) => {
    coursesCtx.changeCourseFilter(event.detail.value, event.detail.checked);
  };
  if (loading) {
    return (
      <div className="spin">
        <IonSpinner className="ion-spinner" color="medium" />
      </div>
    );
  }
  if (error) return `Error! ${error}`;
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {data.courses.map((course: any) => (
            <IonItem key={course.id}>
              <IonLabel>{course.title}</IonLabel>
              <IonToggle
               checked={course.isIncluded}
                value={course.id}
                onIonChange={courseFilterChangeHandler}
                // onClick={()=>refetch()}
              ></IonToggle>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Filter;
