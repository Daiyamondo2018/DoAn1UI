import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './TimKiem.css';

const TimKiem: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tìm Kiếm</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tìm Kiếm</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tìm Kiếm" />
      </IonContent>
    </IonPage>
  );
};

export default TimKiem;
