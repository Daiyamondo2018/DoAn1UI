import React, { Component, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonModal, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel, IonItem, IonImg, IonItemGroup, withIonLifeCycle } from '@ionic/react';
import './CaNhan.css';
import { cart, close, home } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router';
import DangNhap from '../Dang Nhap/DangNhap';
import DangKy from '../Dang Ky/DangKy';

const CaNhan: React.FC = ()=>{
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setLogin] = useState(false);

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButtons>
              <IonTitle size="large">Cá Nhân</IonTitle>
              <IonButton ion-button item-end>
                  <IonIcon class="cart" icon={cart}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent>
      <IonModal isOpen={showModal} onDidDismiss={()=>{setShowModal(false)}}>
        <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/canhan/dangnhap" component={DangNhap}></Route>
                <Route path="/canhan/dangky" component={DangKy}></Route>
                <Route path="/canhan" component={DangNhap}></Route>
              </IonRouterOutlet>
              <IonTabBar slot="top">
                <IonTabButton tab="tab1" href="/canhan/dangnhap" selected={true}>
                  <IonIcon icon={home} class="icon_close"/>
                  <IonLabel>Đăng nhập</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/canhan/dangky">
                  <IonIcon icon={home} />
                  <IonLabel>Đăng ký</IonLabel>
                </IonTabButton>
                <IonTabButton onClick={()=>setShowModal(false)}>
                  <IonIcon icon={close}/>
                  <IonLabel>Close</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
      </IonModal>
      <IonItem class="login_signup" onClick={() => setShowModal(true)}>
        <IonImg class="profile_picture" src="http://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"></IonImg>
        <IonItemGroup>
          <IonLabel class="item">Chào mừng bạn đến với UIT store </IonLabel>
          <IonLabel class="login_label item">Đăng nhập/Đăng ký</IonLabel>
        </IonItemGroup>
      </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default CaNhan;
