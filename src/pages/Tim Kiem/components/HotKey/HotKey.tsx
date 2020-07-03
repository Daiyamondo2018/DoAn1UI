import React, {Component} from 'react';
import { IonItem, IonIcon, IonLabel, IonButtons, IonButton, IonItemGroup, IonGrid, IonMenuButton } from '@ionic/react';
import './HotKey.css';
import { convertTypeToQueryType } from '../../../../util/converter';

const HotKey:React.FC = () => {

    let hotBrands = ["Lenovo", "HP", "Mac", "MSI"];
    let hotDemands = ["Laptop Gaming", "Học tập - Văn phòng", "Đồ họa - Kỹ thuật"];
    let hotTypes = ["Giá rẻ", "Sản phảm mới"];

    const handleSearchBrand = (item: string) => {
        let url ="/ketqua?brand=" + item;
        window.location.replace(url);
    }

    const handleSearchDemand = (item: string) => {
        let url ="/ketqua?demand=" + item;
        window.location.replace(url);
    }

    const handleSearchType = (item: string) => {
        let url ="/ketqua?type=" + convertTypeToQueryType(item);
        window.location.replace(url);
    }

    const hotBrandBlock = hotBrands.map((item)=> {
        return(
            <IonButton class="button" onClick={(e) => handleSearchBrand(item)}>{item}</IonButton>
        )
    })

    const hotDemandBlock = hotDemands.map((item)=> {
        return(
            <IonButton class="button" onClick={(e) => handleSearchDemand(item)}>{item}</IonButton>
        )
    })

    const hotTypeBlock = hotTypes.map((item)=> {
        return(
            <IonButton class="button" onClick={(e) => handleSearchType(item)}>{item}</IonButton>
        )
    })

    return(
        <IonItemGroup>
            <IonItem>
                <IonIcon class="icon" name="trending-up-outline"></IonIcon>
                <IonLabel class = "hotkey_title">Từ Khóa Hot</IonLabel>
            </IonItem>
            {hotBrandBlock}
            {hotTypeBlock}
            {hotDemandBlock}
        </IonItemGroup>
    )
}


const converToFilterType = (filter: string) => {
    
}

export default HotKey;