import React, {Component, useState} from 'react';
import { IonPage, IonTitle, IonContent, useIonViewWillEnter, IonHeader, IonCard, IonCardTitle, IonCardHeader, withIonLifeCycle, useIonViewDidEnter } from '@ionic/react';

const ChiTiet:React.FC = (props: any)=>{

    const [item, setItem] = useState<any>();

    useIonViewDidEnter(async () => {
        await fetchData();
    });

    async function fetchData() {
        let url = window.location.pathname.split("/");
        let respone = await fetch("api/laptops/" + url[url.length-1]);
        let data = await respone.json();
        setItem(data);
        console.log("data: " + data.name);
    }

    return(
        <IonPage>
            <IonHeader>
                Header
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>{item?.name}</IonCardHeader>
                </IonCard>
            </IonContent>
        </IonPage>
    );
} 

export default withIonLifeCycle(ChiTiet);