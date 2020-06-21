import React from 'react';
import { IonHeader, IonPage, IonToolbar, IonTitle, IonContent, withIonLifeCycle } from '@ionic/react';

class HomePage extends React.Component {

  ionViewWillEnter() {
    console.log('ionViewWillEnter event fired')
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave event fired')
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter event fired')
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave event fired')
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent></IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(HomePage);