import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlide, IonRow, IonImg, IonSlides } from '@ionic/react';
import './DanhMuc.css';

const DanhMuc:React.FC = () => {

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Danh mục</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="danhmuc">
        <IonSlides options={options}>
          {advertisementBlock}
        </IonSlides>
        <IonTitle class="welcome">Chào mừng bạn đến với UIT store</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default DanhMuc;
