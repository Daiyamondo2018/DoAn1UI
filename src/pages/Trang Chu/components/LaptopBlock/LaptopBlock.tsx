import React, { Component, useState } from 'react';
import {withIonLifeCycle, useIonViewWillEnter, IonIcon, IonRouterLink, useIonViewDidEnter} from '@ionic/react';
import { IonImg, IonLabel, IonCard, IonCardContent, IonItem, IonList, IonContent, IonTitle } from '@ionic/react';
import './LaptopBlock.css';

export class Laptop {
    id: any;
    name: any;
    alt: any;
    brand: any;
    unit_price: any;
}

const LaptopBlock:React.FC = (props: any)=>{

    const [items, setItems] = useState<Laptop[]>([]);
    console.log(props.url);

    useIonViewDidEnter(async () => {
        await fetchData(props.url);
    });

    async function fetchData(url: any) {
        console.log("begin fetch");
        let respone = await fetch(url);
        console.log("response...");
        let data = await respone.json();
        console.log("data...");
        setItems(data);
    }

    console.log("items: " + items);

    let laptops = items.map((item) => {
        let imgUrl = "/api/images/600/laptops/" + item.id+ "/" + decodeURI(item.name) + ".jpg";
        let routerLink = "/trangchu/" + item.id;
        return(
           <IonCard key={item.id} class="laptop" href={routerLink}>
                <IonCardContent>
                        <IonTitle class="name">{item.name}</IonTitle>
                        <IonImg src={imgUrl}></IonImg>
                        <IonItem class="price">{item.unit_price}</IonItem>
                </IonCardContent>
           </IonCard>
        )
    })

    return(
        <IonList class="laptops">
            {laptops}
        </IonList>        
    );
};
export default withIonLifeCycle(LaptopBlock);