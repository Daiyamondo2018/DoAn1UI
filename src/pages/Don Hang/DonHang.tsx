import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './DonHang.css';

const DonHang: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Đơn Hàng</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ĐƠn Hàng</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Đơn Hàng" />
      </IonContent>
    </IonPage>
  );
};

export default DonHang;
