import React, {Component} from 'react';
import { IonItem, IonIcon, IonLabel, IonButtons, IonButton, IonItemGroup, IonGrid, IonMenuButton } from '@ionic/react';
import './HotKey.css';

class HotKey extends Component {
    render() {
        return(
            <IonItemGroup>
                <IonItem>
                    <IonIcon class="icon" name="trending-up-outline"></IonIcon>
                    <IonLabel class = "title">Từ Khóa Hot</IonLabel>
                </IonItem>
                <IonButton class="button">Laptop Lenovo</IonButton>
                <IonButton class="button">Gamming</IonButton>
                <IonButton class="button">Macbook</IonButton>
                <IonButton class="button">MSI</IonButton>
                <IonButton class="button">Giá rẻ</IonButton>
                <IonButton class="button">Sản phẩm mới</IonButton>
                <IonButton class="button">Học tập - văn phòng</IonButton>
            </IonItemGroup>
        )
    }
}

export default HotKey;