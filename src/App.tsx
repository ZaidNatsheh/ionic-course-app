import React from "react";
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { Route, Redirect, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import Filter from "./pages/Filter";
import CourseTabs from "./pages/CourseTabs";
import CoursesContextProvider from "./data/CoursesContextProvider";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/theme.css";
import SideDrawer from "./component/SideDrawer"
import Courses from "./pages/Courses";
import AllGoals from "./pages/AllGoals";
import CourseGoals from "./pages/CourseGoals";
import { list, trophyOutline } from "ionicons/icons";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <SideDrawer />
      <CoursesContextProvider>
      <IonTabs>
        <IonRouterOutlet id="main">
        <Switch>
          <Route path="/filter" exact>
            <Filter />
          </Route>
          <Route path="/courses" exact>
            <CourseTabs />
          </Route>
          <Route exact path="/" render={()=> <Redirect to="/courses"/>} />
        <Redirect path="/courses" to="/courses/all-goals" exact />
        <Route path="/courses/lists" exact>
          <Courses />
        </Route>
        <Route path="/courses/all-goals" exact>
          <AllGoals />
        </Route>
        <Route path="/courses/:courseId">
          <CourseGoals />
        </Route>
        </Switch>
          {/* <Redirect path="/" to="/courses" exact /> */}
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="all-goals" href="/courses/all-goals">
          <IonIcon icon={list} />
          <IonLabel>All Goals</IonLabel>
        </IonTabButton>
        <IonTabButton tab="courses" href="/courses/lists">
          <IonIcon icon={trophyOutline} />
          <IonLabel>Courses</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
      </CoursesContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
