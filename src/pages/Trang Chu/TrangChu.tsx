import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './TrangChu.css';
import Header from './components/Header/Header';

class TrangChu extends Component {
  render() {
    return (
      <IonPage>
        <Header/>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Trang Chủ</IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonContent>
      </IonPage>
    );
  }
  componentDidMount() {
    fetch('/api/laptops')
    .then(response => response.json())
    .then(data => console.log(data));
  }
};

export default TrangChu;
