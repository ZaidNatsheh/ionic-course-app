import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <SideDrawer />
      <CoursesContextProvider>
        <IonRouterOutlet id="main">
          <Route path="/filter" exact>
            <Filter />
          </Route>
          <Route path="/courses" exact>
            <CourseTabs />
          </Route>
          <Redirect path="/" to="/courses" exact />
        </IonRouterOutlet>{" "}
      </CoursesContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
