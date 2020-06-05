import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './DanhMuc.css';

const DanhMuc: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Danh mục</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Danh Mục</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Danh Mục" />
      </IonContent>
    </IonPage>
  );
};

export default DanhMuc;
