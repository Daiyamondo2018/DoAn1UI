import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle, IonRouterOutlet, IonSlides, IonSlide, IonImg, IonLabel, IonRow, useIonViewDidEnter } from '@ionic/react';
import './TrangChu.css';
import Header from './components/Header/Header';
import LaptopBlock from './components/LaptopBlock/LaptopBlock';

export const TrangChu:React.FC= ()=>{

  const options = {
    initialSlide: 3,
    speed: 400,
    spaceBetween: 10,
    effect: 'fade',
    autoplay: {
      delay: 3000,
    },
    loop: true, 
    pager: true,
  }

  const autoSlide = async () => {

  }

  const advertisements = [
    {
      id: 1,
      src: 'https://salt.tikicdn.com/cache/w885/ts/banner/d3/be/71/5ef563e60c6474802ae5fe8ae0b4f9ee.jpg',
      title: "Picture 1"
  }, 
  {
      id: 2,
      src: 'https://salt.tikicdn.com/cache/w885/ts/banner/ad/51/c6/aa1a0e23b0525755ade46fe9d72723c3.jpg',
      title: "Picture 2"
  }, 
  {
      id: 3,
      src:'https://salt.tikicdn.com/cache/w885/ts/banner/2e/e1/6d/a0c3e2bd0fa53ede55a3f9c2a30ee5e7.jpg',
      title: "Picture 3"
  }
  ];

  const advertisementBlock = advertisements.map((ad) => {
    return (
      <IonSlide key = {ad.id}>
        <IonRow><IonImg class="full_image" src = {ad.src}></IonImg></IonRow>
      </IonSlide>
    );
  })

  return(
    <IonPage>
        <Header searchParam=""/>
        <IonContent class="content">
          <IonSlides options={options}>
            {advertisementBlock}
          </IonSlides>
          <IonTitle class="welcome">Chào mừng bạn đến với UIT store</IonTitle>
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
