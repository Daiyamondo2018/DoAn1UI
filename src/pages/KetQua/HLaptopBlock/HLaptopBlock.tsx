import React, { Component, useState } from 'react';
import {withIonLifeCycle, useIonViewWillEnter, IonIcon, IonRouterLink, useIonViewDidEnter, IonRow} from '@ionic/react';
import { IonImg, IonLabel, IonCard, IonCardContent, IonItem, IonList, IonContent, IonTitle } from '@ionic/react';
import './HLaptopBlock.css';
import { Laptop } from '../../Trang Chu/components/LaptopBlock/LaptopBlock';
import RatingBlock from '../../ChiTiet/components/RatingBlock/RatingBlock';

type Props = {
    items: Laptop[];
}

const HLaptopBlock:React.FC<Props> = (props)=>{
    let laptops = props.items; 
    let laptopBlock = laptops?laptops.map((item) => {
        let imgUrl = "/api/images/600/laptops/" + item.id+ "/" + decodeURI(item.name) + ".jpg";
        let routerLink = "/trangchu/" + item.id;
        return(
           <IonCard key={item.id} class="laptop" href={routerLink}>
                <IonTitle class="name">{item.name}</IonTitle>
                <IonImg class="product_image" src={imgUrl}></IonImg>
                <IonLabel class="price">{(item.unit_price-item.discount_price).toLocaleString() + " đ\n"}</IonLabel>
                <IonRow></IonRow>
                <IonLabel class="discount_price">{item.unit_price.toLocaleString() +" đ"}</IonLabel>
                <RatingBlock></RatingBlock>
           </IonCard>
        )
    }):"";

    return(
        <IonList>
            {laptopBlock}
        </IonList>        
    );
};
export default withIonLifeCycle(HLaptopBlock);