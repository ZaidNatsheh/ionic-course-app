import React, { useState, useContext } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  isPlatform,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSpinner,
} from "@ionic/react";
import AddCourseModal from "../component/AddCourseModal";
import { addOutline } from "ionicons/icons";
import CourseItem from "../component/CourseItem";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CourseContext from "../data/courses-context";

const GET_COURSES = gql`
  query MySubscription {
    courses {
      id
      title
      enrolled
    }
  }
`;

const Courses: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);

  const courseCtx = useContext(CourseContext);
  const startAddCourseHandler = () => {
    setIsAdding(true);
  };

  const { data, error, loading } = useQuery(GET_COURSES,{
    pollInterval : 100
  });
  if (loading) {
    return (
      <div className="spin">
        <IonSpinner className="ion-spinner" color="medium" />
      </div>
    );
  }
  if (error) {
    return <div>Error...</div>;
  }

  const cancelAddCourseHandler = () => {
    setIsAdding(false);
  };
  const courseAddHandler = (title: string, date: Date) => {
    courseCtx.addCourse(title, date);
    setIsAdding(false);
  };
  return (
    <React.Fragment>
      <AddCourseModal
        show={isAdding}
        onCancel={cancelAddCourseHandler}
        onSave={courseAddHandler}
      />

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Courses</IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={startAddCourseHandler}>
                  <IonIcon slot="icon-only" icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            {data.courses.map((course: any) => (
              <IonRow key={course.id}>
                <IonCol size-md="4" offset-md="4">
                  <CourseItem
                    title={course.title}
                    id={course.id}
                    enrolmentDate={course.enrolled}
                  />
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
          {isPlatform("android") && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddCourseHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Courses;
