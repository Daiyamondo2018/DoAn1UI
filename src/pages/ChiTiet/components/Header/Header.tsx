import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonSearchbar, IonTitle, IonIcon, IonButtons, IonButton, IonText } from '@ionic/react';
import { cart, arrowBackOutline } from 'ionicons/icons';
import './Header.css';
import { getArrayfromLocalStorage, putArraytoLocalStorage } from '../../../../util/cookie';
import { updateCartQuantity, getCart, updateCart } from '../../../../util/cart';

class Header extends Component{
    goToAnotherPage(e: React.KeyboardEvent) {
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

    goback() {
        // window.location.replace("/trangchu");
        window.history.back();
    }
    render() {
        let cartItems = getCart();
        updateCart(cartItems);
        return(
            <IonHeader class="header"> 
                <IonToolbar class="header_toolbar">
                    <IonButtons>
                        <IonIcon class="toolbar_icon" onClick={() => this.goback()} icon={arrowBackOutline}></IonIcon>
                        <IonSearchbar id="searchbar" color="black" class="header_searchbar" placeholder = "Nhập tên để tìm..." onKeyPress={e =>this.goToAnotherPage(e)}/>
                        <IonButton href="/giohang" ion-button item-end>
                            <IonIcon class="cart" icon={cart}>
                            </IonIcon>
                            <IonText id = "cart_count"></IonText>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        )
    }
};

export default Header;
