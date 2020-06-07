import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonSearchbar, IonTitle, IonIcon, IonButtons, IonButton } from '@ionic/react';
import { cart } from 'ionicons/icons';
import './Header.css';

class Header extends Component{
    render() {
        return(
            <IonHeader class="header"> 
                <IonToolbar class="header_toolbar">
                    <IonButtons>
                        <IonSearchbar color="black" class="header_search" placeholder = "Nhập tên để tìm..."/>
                        <IonButton ion-button item-end>
                            <IonIcon icon={cart}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        )
    }
};

function openCartPage(e: any) {
    alert("open cart");
}

export default Header;
