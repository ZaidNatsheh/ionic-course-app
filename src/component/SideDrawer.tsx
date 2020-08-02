import React from 'react'
import {
    IonIcon,
    IonLabel,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle
  } from '@ionic/react';
  import { list, options } from 'ionicons/icons';

const SideDrawer:React.FC = () => {
    return (
        <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Course Goals</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink="/courses/all-goals" routerDirection="none">
                <IonIcon slot="start" icon={list} />
                <IonLabel>All Goals</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem button routerLink="/filter" routerDirection="none">
                <IonIcon slot="start" icon={options} />
                <IonLabel>Filter</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    )
}

export default SideDrawer
