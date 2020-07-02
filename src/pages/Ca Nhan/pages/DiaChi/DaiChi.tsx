import React, { useState } from 'react';
import './DiaChi.css';
import { IonPage, IonHeader, IonToolbar, IonRow, IonIcon, IonCol, IonTitle, IonContent, IonGrid, IonLabel, IonInput, IonButton, useIonViewDidEnter } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { getCookie } from '../../../../util/cookie';


export class ChiTietDiaChi {
    id: any;
    address_num: any;
    street: any;
    ward: any;
    district: any;
    city: any;
    receiver_name: any;
    receiver_phone: any;
    user_id: any;
}

const DiaChi: React.FC = () => {

    const [addresses, setAddresses] = useState<ChiTietDiaChi[]>([]);
    const [address, setAddress] = useState(new ChiTietDiaChi());

    const convertAddressToData = (adsress: ChiTietDiaChi) => {
        return {
            receiverName: address.receiver_name,
            receiverPhone: address.receiver_phone,
            city: address.city,
            district: address.district,
            ward: address.ward,
            street: address.street,
            addressNum: address.address_num,
        }
    }

    useIonViewDidEnter(async () => {
        loadAddresses();
    })

    const loadAddresses = async () => {
        const response = await fetch("/api/users/me/addresses", {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const addresses_ = await response.json();
            setAddresses(addresses_);
            if(addresses_[0]) {
                console.log("SDSDSSSF")
                setAddress(addresses_[0]);
            }
            else {
                setAddress(new ChiTietDiaChi());
            }
        }
    };

    const save_Address = async () => {
        let url = "/api/addresses" ;
        if(address.id) {
            url ="/api/addresses/" + address.id;
        }
        console.log("Address: " + JSON.stringify(convertAddressToData(address)));
        const response = await fetch(url, {
            method: address.id ? 'PUT' : 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify(convertAddressToData(address)),
        });
        if (response.ok) {
            alert("Lưu thành công");
            return;
        }
    }

    const goback = () => {
        window.location.replace("/canhan");
    }

    return (
        <IonPage>
            <IonHeader class="header">
                <IonToolbar>
                    <IonRow>
                    <IonIcon class="back" icon={arrowBackOutline} onClick={goback}></IonIcon>
                    <IonCol>
                        <IonTitle class="title">Thông tin địa chỉ</IonTitle>
                    </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent class="diachi">
                <IonGrid>
                    <IonLabel class="label">Họ tên</IonLabel>
                    <IonInput class="input" onIonChange={e=> address.receiver_name=e.detail.value} value={address ? address.receiver_name: ""}></IonInput>
                    <IonLabel class="label">Điện thoại</IonLabel>
                    <IonInput class="input" onIonChange={e=> address.receiver_phone=e.detail.value} value={address ? address.receiver_phone: ""}></IonInput>
                    <IonLabel class="label">Tỉnh/Thành</IonLabel>
                    <IonInput class="input" onIonChange={e=> address.city=e.detail.value} value={address ? address.city: ""}></IonInput>
                    <IonLabel class="label">Quận huyện</IonLabel>
                    <IonInput class="input" onIonChange={e=> address.district=e.detail.value} value={address ? address.district: ""}></IonInput>
                    <IonLabel class="label">Xã phường</IonLabel>
                    <IonInput class="input" onIonChange={e=> address.ward=e.detail.value} value={address ? address.ward: ""}></IonInput>
                    <IonLabel class="label">Đường</IonLabel>
                    <IonInput class="input" onIonChange={e=> address.street=e.detail.value} value={address ? address.street: ""}></IonInput>
                    <IonLabel class="label" >Số nhà</IonLabel>
                    <IonInput class="input" onIonChange={e=> address.address_num=e.detail.value} value={address ? address.address_num: ""}></IonInput>
                    <IonButton class="save_button" onClick={save_Address}>Lưu</IonButton>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default DiaChi;