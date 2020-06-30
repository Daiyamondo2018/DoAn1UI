import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonLabel, IonTitle, withIonLifeCycle, useIonViewDidEnter } from '@ionic/react';
import Header from '../Trang Chu/components/Header/Header';
import HLaptopBlock from './HLaptopBlock/HLaptopBlock';
import { Laptop } from '../Trang Chu/components/LaptopBlock/LaptopBlock';
import './KetQua.css';

const KetQua: React.FC = ()=> {
    const [items, setItems] = useState<Laptop[]>([]);
    let search = window.location.search;
    let name = new URLSearchParams(search).get("name");
    var type = new URLSearchParams(search).get("type");
    var value = new URLSearchParams(search).get("value");
    let url = "/api/laptops/result?name=" + name;
    useIonViewDidEnter(async () => {
        await fetchData();
    });
    async function fetchData() {
        if(!name) {
            url = "/api/laptops/result";
            var bodyContent = new FormData();
            console.log("json" + JSON.stringify(type) + JSON.stringify(value));
            bodyContent.append(JSON.stringify(type), JSON.stringify(value?.toUpperCase()));
            bodyContent.append("page", "1");
            const requestOption = {
                method: "POST",
                header: {"Content-Type": "application/json; charset=utf-8"},
                body: bodyContent
            };
            let response = await fetch(url, requestOption);
            let data = await response.json();
            setItems(data);
            return;
        }

        let respone = await fetch(url);
        let data = await respone.json();
        setItems(data);
    }
    let title = "Tìm thấy " + items.length + " sản phẩm phù hợp";
    if(items.length == 0) {
        title ="Không tìm thấy sản phẩm phù hợp";
    }
    return(
        <IonPage>
           <Header searchParam={name?name:""}></Header>
            <IonContent class="content">
                <IonTitle class="title">{title}</IonTitle>
                {items?<HLaptopBlock items={items}/>:""}
            </IonContent>
        </IonPage>
    );
}

export default withIonLifeCycle(KetQua);