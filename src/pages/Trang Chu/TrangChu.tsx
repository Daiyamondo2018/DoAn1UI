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
      delay: 2000,
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
      title: "Picture 1",
      url: "https://tiki.vn/laptop-gaming/c5584?_v=rk_6&src=static_block&utm_expid=.RasMS6yQTZOPoupXgn8U5A.1&utm_referrer=https%3A%2F%2Ftiki.vn%2Flaptop-may-vi-tinh-linh-kien%2Fc1846%3F_v%3Drk_6%26src%3Dc.1846.hamburger_menu_fly_out_banner"
  }, 
  {
      id: 2,
      src: 'https://salt.tikicdn.com/cache/w885/ts/banner/ad/51/c6/aa1a0e23b0525755ade46fe9d72723c3.jpg',
      title: "Picture 2",
      url: "https://tiki.vn/man-hinh-may-tinh/c2665?_v=rk_6&src=static_block&utm_expid=.RasMS6yQTZOPoupXgn8U5A.1&utm_referrer=https%3A%2F%2Ftiki.vn%2Flaptop-may-vi-tinh-linh-kien%2Fc1846%3F_v%3Drk_6%26src%3Dc.1846.hamburger_menu_fly_out_banner"
  }, 
  {
      id: 3,
      src:'https://salt.tikicdn.com/cache/w885/ts/banner/2e/e1/6d/a0c3e2bd0fa53ede55a3f9c2a30ee5e7.jpg',
      title: "Picture 3",
      url: "https://tiki.vn/laptop-may-vi-tinh-linh-kien/c1846?_v=rk_6&src=c.1846.hamburger_menu_fly_out_banner&utm_expid=.RasMS6yQTZOPoupXgn8U5A.1&utm_referrer=https%3A%2F%2Ftiki.vn%2F"
  }
  ];

  const navigateToTiki = (ad: any) => {
    window.location.replace(ad.url);
  }

  const advertisementBlock = advertisements.map((ad) => {
    return (
      <IonSlide onClick={()=>navigateToTiki(ad)} key = {ad.id}>
        <IonRow><IonImg class="full_image" src = {ad.src}></IonImg></IonRow>
      </IonSlide>
    );
  })

  return(
    <IonPage>
        <Header searchParam=""/>
        <IonContent class="trangchu">
          <IonTitle class="welcome">Chào mừng bạn đến với UIT store</IonTitle>
          <IonSlides options={options}>
            {advertisementBlock}
          </IonSlides>
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
