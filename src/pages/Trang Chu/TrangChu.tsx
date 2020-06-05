import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './TrangChu.css';

const TrangChu: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Trang Chủ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Trang Chủ</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Trang Chủ" />
      </IonContent>
    </IonPage>
  );
};

export default TrangChu;
