import React, { Component, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlide, IonRow, IonImg, IonSlides, IonCol, IonList, IonCard, IonItem, useIonViewDidEnter, IonButtons, IonSearchbar, IonButton, IonIcon, IonText, IonLabel } from '@ionic/react';
import './DanhMuc.css';
import { getCart, updateCart, updateCartQuantity } from '../../util/cart';
import Header from '../Trang Chu/components/Header/Header';
import { getArrayfromLocalStorage, putArraytoLocalStorage } from '../../util/cookie';
import { cart } from 'ionicons/icons';
import acer from '../../images/logos/acer.png';
import asus from '../../images/logos/asus.png';
import dell from '../../images/logos/dell.png';
import hp from '../../images/logos/hp.png';
import lenovo from '../../images/logos/lenovo.png';
import mac from '../../images/logos/mac.png';
import msi from '../../images/logos/msi.png';
import { prices, cpus, rams, harddrives, monitors } from '../../util/constants';
import { convertToSearchValue } from '../../util/converter';

class Tag {
  id: any;
  name: any;
}

const DanhMuc:React.FC = () => {

  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState<Tag[]>([]);

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

  const barndImages = [
    {
      id:1,
      src: acer,
      name: "Acer",
    },
    {
      id: 2,
      src: asus,
      name: "Asus",
    },
    {
      id: 3,
      src: dell,
      name: "Dell"
    },
    {
      id: 4,
      src: hp,
      name: "HP"
    },
    {
      id: 5,
      src: lenovo,
      name: "Lenovo"
    },
    {
      id: 6,
      src: mac,
      name: "Mac"
    }, 
    {
      id: 7,
      src: msi,
      name: "MSI"
    }
  ];

  let cartItems = getCart();
  const quantity = String(Object.values(cartItems).reduce((a: any, b: any) => a + b, 0));
  const goToAnotherPage = (e: React.KeyboardEvent) =>{
    if(e.charCode == 13) {
      let name = String(document.getElementById("searchbar")?.getElementsByTagName("input")[0].value);    
      let names = [];
      names = getArrayfromLocalStorage("names");
      if(names == null) {
          names = [];
          if(name != "") {
              names.push(name);
          }
      }
      else {
          if(name != null && name != "" && names.indexOf(name) == -1) {
              names.push(name);
          }
      }
      console.log("names: " + names);
      putArraytoLocalStorage("names", names);
      window.location.replace("/ketqua?name="+name);  
    }
  }

  const goToResult = (title:any, value: any) => {
    window.location.replace("/ketqua?"+title+"="+value);
  }

  const getBrands = async () => {
    let url = "/api/brands";
    const response = await fetch(url);
    const data = await response.json();
    setBrands(data);
  }

  const getDemands = async () => {
    let url = "/api/tags";
    const response = await fetch(url);
    const data = await response.json();
    setTags(data);
    console.log(JSON.stringify(data));
  }

  useIonViewDidEnter(async () => {
    getBrands();
    getDemands();
  })

  const advertisementBlock = advertisements.map((ad) => {
    return (
      <IonSlide key = {ad.id}>
        <IonRow><IonImg class="full_image" src = {ad.src}></IonImg></IonRow>
      </IonSlide>
    );
  })

  const demandBlock = tags.map((tag) => {
    return(
      <IonButton  onClick={e => goToResult("demand",tag.name)}>{tag.name}</IonButton>
    );
  })

  const brandBlock = barndImages.map((brand) => {
    return(
      <IonCard class="brand_logo" key={brand.id} onClick={e => goToResult("brand",brand.name)}>
        <IonImg class="brand_image" src={brand.src}></IonImg>
        <IonLabel>{brand.name}</IonLabel>
      </IonCard>
    );
  })

  const priceBlock = prices.map((price) => {
    return(
      <IonButton  onClick={e => goToResult("price",convertToSearchValue(price))}>
        {price}
      </IonButton>
    );
  })

  const cpuBlock = cpus.map((cpu) => {
    return(
      <IonButton onClick={e => goToResult("cpu",convertToSearchValue(cpu))}>
        {cpu}
      </IonButton>
    );
  })

  const ramBlock  = rams.map((ram) => {
    return(
      <IonButton onClick={e => goToResult("ram",convertToSearchValue(ram))}>
        {ram}
      </IonButton>
    );
  })

  const harddriveBlock = harddrives.map((harddrive) => {
    return(
      <IonButton onClick={e => goToResult("hardDrive",convertToSearchValue(harddrive))}>
        {harddrive}
      </IonButton>
    );
  })

  const monitorBlock = monitors.map((monitor) => {
    return(
      <IonButton onClick={e => goToResult("monitor",convertToSearchValue(monitor))}>
        {monitor}
      </IonButton>
    );
  })

  return (
    <IonPage>
      <IonHeader class="header"> 
        <IonToolbar class="header_toolbar">
          <IonButtons>
            <IonSearchbar id="searchbar" color="black" class="header_searchbar" placeholder = "Nhập tên để tìm..." onKeyPress={e =>goToAnotherPage(e)}/>
            <IonButton href="/giohang" ion-button item-end>
                <IonIcon class="cart" icon={cart}>
                </IonIcon>
                <IonText id = "cart_count">{quantity}</IonText>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="danhmuc">
        <IonCol class="rightside">
          <IonTitle class="welcome">Chào mừng bạn đến với UIT store</IonTitle>
          <IonSlides options={options}>
            {advertisementBlock}
          </IonSlides>
          <IonTitle>Thương Hiệu</IonTitle>
          <IonList>
          {brandBlock}
          </IonList>
          <IonTitle>Nhu Cầu Sử Dụng</IonTitle>
          <IonList>
          {demandBlock}
          </IonList>
          <IonTitle>Giá</IonTitle>
          <IonList>
          {priceBlock}
          </IonList>
          <IonTitle>CPU</IonTitle>
          <IonList>
          {cpuBlock}
          </IonList>
          <IonTitle>RAM</IonTitle>
          {ramBlock}
          <IonTitle>Ổ Cứng</IonTitle>
          {harddriveBlock}
          <IonTitle>Màn Hình</IonTitle>
          {monitorBlock}
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default DanhMuc;
