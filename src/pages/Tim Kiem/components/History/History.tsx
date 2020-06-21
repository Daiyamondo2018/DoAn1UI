import React, {Component} from 'react';
import { IonTitle, IonButton, IonItem, IonItemGroup } from '@ionic/react';
import './History.css';

class History extends Component {
    render() {
        return (
            <IonItemGroup>
                <IonItem>
                    <IonTitle>
                        History
                    </IonTitle>
                    <IonButton class="delete_all">
                        Xóa
                    </IonButton>
                </IonItem>
                <IonItem>Button 1</IonItem>
            </IonItemGroup>
        )
    }
}

export default History;