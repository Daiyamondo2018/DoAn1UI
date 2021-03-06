import React, {Component} from 'react';
import { IonToolbar, IonHeader, IonSearchbar } from '@ionic/react';
import './Header.css';
import { getCookie, getArrayfromLocalStorage, putArraytoLocalStorage } from '../../../../util/cookie';

class Header extends Component {

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
            window.location.replace("/timkiem/ketqua?name="+name);  
        }
    }
  
    render() {
        return(
            <IonHeader class="header">
                <IonToolbar class="header_toolbar">
                    <IonSearchbar id="searchbar" color="black" class="header_searchbar" placeholder="Nhập để tìm kiếm..." onKeyPress={e =>this.goToAnotherPage(e)}/>
                </IonToolbar>
            </IonHeader> 
        )
    }
}

export default Header;