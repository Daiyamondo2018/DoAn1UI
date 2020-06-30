import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './DonHang.css';
import { isLogin } from '../../util/account';
import { Redirect } from 'react-router';

const DonHang:React.FC = () =>{

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
            <IonTitle size="large">Đơn Hàng</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default DonHang;
