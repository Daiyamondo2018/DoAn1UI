import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './CaNhan.css';

const CaNhan: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cá Nhân</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cá Nhân</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Cá Nhân" />
      </IonContent>
    </IonPage>
  );
};

export default CaNhan;
