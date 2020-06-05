import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './GioHang.css';

const GioHang: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Giỏ Hàng</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Giỏ Hàng</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Giỏ Hàng" />
      </IonContent>
    </IonPage>
  );
};

export default GioHang;
