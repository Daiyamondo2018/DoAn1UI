import React from 'react';
import './ChiTietDonHang.css';
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonIcon, IonCol, IonRow } from '@ionic/react';
import Header from '../../../Trang Chu/components/Header/Header';
import { arrowBackOutline } from 'ionicons/icons';

type Props = {
    id: any;
}
const ChiTietDonHang: React.FC<Props> = (props) => {

    const goback = () => {
        window.location.replace("/donhang");
    }

    return(
        <IonPage>
           <IonHeader class="header">
                <IonToolbar>
                    <IonRow>
                    <IonIcon class="back" icon={arrowBackOutline} onClick={goback}></IonIcon>
                    <IonCol>
                        <IonTitle class="title">Chi tiết đơn hàng</IonTitle>
                    </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent>

            </IonContent>
        </IonPage>
    );
}

export default ChiTietDonHang;