import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle, IonRouterOutlet } from '@ionic/react';
import './TrangChu.css';
import Header from './components/Header/Header';
import LaptopBlock from './components/LaptopBlock/LaptopBlock';

export const TrangChu:React.FC= ()=>{
  return(
    <IonPage>
        <Header searchParam=""/>
        <IonContent class="content">
          <IonTitle class="block_title">Sản phẩm mới</IonTitle>
          <LaptopBlock url="/api/laptops/types/new"/>
          <IonTitle class="block_title">Sản phẩm bán chạy</IonTitle>
          <LaptopBlock url="/api/laptops/types/top-selling"/>
          <IonTitle class="block_title">Sản phẩm phổ biến</IonTitle>
          <LaptopBlock url="/api/laptops/types/common"/>
          <IonTitle class="block_title">Sản phẩm giá rẻ</IonTitle>
          <LaptopBlock url="/api/laptops/types/cheap"/>
        </IonContent>
    </IonPage>
);
};
export default TrangChu;
