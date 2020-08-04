import React from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonSpinner,
  IonLabel,
} from "@ionic/react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Filter_Goals = gql`
  query mysub {
    goals(
      where: { course: { isIncluded: { _eq: true } } }
      order_by: { course: { title: asc } }
    ) {
      text
      course_id
      id
      course {
        isIncluded
        title
        id
      }
    }
  }
`;
const AllGoals: any = () => {
  const { data, error, loading } = useQuery(Filter_Goals, {
    pollInterval: 50,
  });
  if (loading) {
    return (
      <div className="spin">
        <IonSpinner className="ion-spinner" color="medium" />
      </div>
    );
  }
  if (error) {
    return `Error! ${error}`
  }
  console.log(error);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>All Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data.goals.map((goal: any) => (
          <IonItem key={goal.id}>
            <IonLabel>
              <h2> {goal.text}</h2>
              <p>{goal.course.title}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default AllGoals;
