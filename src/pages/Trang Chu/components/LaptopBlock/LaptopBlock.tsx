import React, { Component, useState } from 'react';
import {withIonLifeCycle, useIonViewWillEnter, IonIcon, IonRouterLink, useIonViewDidEnter, IonRow} from '@ionic/react';
import { IonImg, IonLabel, IonCard, IonCardContent, IonItem, IonList, IonContent, IonTitle } from '@ionic/react';
import './LaptopBlock.css';

export class Laptop {
    id: any;
    name: any;
    alt: any;
    brand: any;
    unit_price: any;
    discount_price: any;
    quantity: any;
    avg_rating: any;
    graphics_card: any;
    ports: any;
    os: any;
    design: any;
    thickness: any;
    weight: any;
    cpu: CPU = new CPU();
    ram: RAM = new RAM();
    hard_drive: HardDrive = new HardDrive();
    monitor: Monitor = new Monitor();
}

export class CPU {
    id: any;
    type:
    any;
    detail: any;
    speed: any;
    max_speed: any;
}

export class RAM {
    id: any;
    size: any;
    type: any;
    bus: any;
    extra_slot: any;
}

export class HardDrive {
    id: any;
    size: any;
    type: any;
    detail: any;
}

export class Monitor {
    id: any;
    size: any;
    resolution_type: any;
    resolution_width: any;
    resolution_height: any;
}

export class Promotion {
    id: any;
    name: any;
    price: any;
    quantity: any;
    alt: any;
}

const LaptopBlock:React.FC = (props: any)=>{

    const [items, setItems] = useState<Laptop[]>([]);
    console.log(props.url);

    useIonViewDidEnter(async () => {
        await fetchData(props.url);
    });

    async function fetchData(url: any) {
        let respone = await fetch(url);
        let data = await respone.json();
        setItems(data);
    }

    let laptops = items.map((item) => {
        let imgUrl = "/api/images/600/laptops/" + item.id+ "/" + decodeURI(item.name) + ".jpg";
        let routerLink = "/trangchu/" + item.id;
        return(
           <IonCard key={item.id} class="laptop" href={routerLink}>
                <IonTitle class="name">{item.name}</IonTitle>
                <IonImg class="product_image" src={imgUrl}></IonImg>
                <IonLabel class="price">{(item.unit_price-item.discount_price).toLocaleString() + " đ\n"}</IonLabel>
                <IonRow></IonRow>
                <IonLabel class="discount_price">{item.unit_price.toLocaleString() +" đ"}</IonLabel>
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