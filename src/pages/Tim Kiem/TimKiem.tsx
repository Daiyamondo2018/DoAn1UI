import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './TimKiem.css';
import Header from './components/Header/Header';
import HotKey from './components/HotKey/HotKey';
import History from './components/History/History';

class TimKiem extends Component {
  render() {
    return (
      <IonPage>
        <Header/>
        <IonContent>
          <HotKey/>
          <History/>
        </IonContent>
      </IonPage>
    );
  }
};

export default TimKiem;
