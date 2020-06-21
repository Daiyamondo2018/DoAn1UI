import React, {Component} from 'react';
import { IonToolbar, IonHeader, IonSearchbar } from '@ionic/react';
import './Header.css';

class Header extends Component {
  
    render() {
        return(
            <IonHeader class="header">
                <IonToolbar class="header_toolbar">
                    <IonSearchbar color="black" class="header_searchbar" placeholder="Tên sản phẩm..."/>
                </IonToolbar>
            </IonHeader> 
        )
    }
}

export default Header;