import React, {Component, useState} from 'react';
import { IonTitle, IonButton, IonItem, IonItemGroup, IonIcon, IonLabel, IonRouterLink, IonRow } from '@ionic/react';
import './History.css';
import { getArrayfromLocalStorage, putArraytoLocalStorage } from '../../../../util/cookie';
import { close } from 'ionicons/icons';

const History:React.FC = () => {

    const [removed, setRemoved] = useState(false);
    let names = [];
    names = getArrayfromLocalStorage("names"); 
    let temp = String(names);
    names = temp.split(",");

    const clearHistory = () => {
        putArraytoLocalStorage("names", []);
        setRemoved(!removed);
    }

    const removeFromLocalStorage = (item: any) => {
        let names = [];
        names = getArrayfromLocalStorage("names"); 
        let temp = String(names);
        names = temp.split(",");
        if(names.length>0) {
            let index = names.indexOf(item);
            if(index>=0) {
                names.splice(index,1);
                putArraytoLocalStorage("names", names);
                setRemoved(!removed);
            }
        }
    }

    console.log("items: " + JSON.stringify(names));
    let historyBlock = names.map((element) => {
        if(element === null) {
            return("");
        }
        const url = "/ketqua?name=" + element;
        return(
            element!= "" ? <IonRow key={element}>
                <IonButton class="search_button" key={element} href={url}>{element}</IonButton>            
                <IonButton  onClick={()=>{removeFromLocalStorage(element)}}>
                    <IonIcon icon={close} class="close"></IonIcon>
                </IonButton>
            </IonRow>: ""
        );
    });

    console.log("block: " + (historyBlock[0] === null));

    return (
        <IonItemGroup class="history">
            <IonItem>
                <IonTitle>
                    Lịch sử tìm kiếm
                </IonTitle>
                <IonButton class="delete_all" onClick= {clearHistory}>
                    Xóa
                </IonButton>
            </IonItem>
            {historyBlock}
        </IonItemGroup>
    )    
}

export default History;