import React, { useState } from 'react';
import './ThemDiaChi.css';
import { IonPage, IonHeader, IonToolbar, IonRow, IonIcon, IonCol, IonTitle, IonContent, IonGrid, IonLabel, IonInput, IonButton, useIonViewDidEnter, IonItem, IonAlert } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { getCookie } from '../../../../util/cookie';
import { isLogin } from '../../../../util/account';
import { Redirect } from 'react-router';


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

const ThemDiaChi: React.FC = () => {

    const [addresses, setAddresses] = useState<ChiTietDiaChi[]>([]);
    const [address, setAddress] = useState(new ChiTietDiaChi());
    const [login, setLogin]  = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
    const save_Address = async () => {

        if(!checkInput()) {
            return;
        }

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
            setSuccess("Thêm mới địa chỉ thành công");
            return;
        }
        else {
            setError("Lỗi hệ thống!");
            goback();
            return;
        }
    }

    const goback = () => {
        window.location.replace("/canhan");
    }

    const checkInput = () => {
        if(address.address_num === "" || !address.address_num
            || address.city === "" || !address.city
            || address.district === "" || !address.district
            || address.receiver_name === "" || !address.receiver_name
            || address.receiver_phone === "" || !address.receiver_phone
            || address.street === "" || !address.street
            || address.ward ==="" || !address.ward) {
                setError("Không được để trống các trường!");
                return false;
        }
        return true;
    }

    return (
        (loading || login) ?
        <IonPage>
            <IonHeader class="header">
                <IonToolbar>
                    <IonRow>
                    <IonIcon class="back" icon={arrowBackOutline} onClick={goback}></IonIcon>
                    <IonCol>
                        <IonTitle class="title">Thêm địa chỉ</IonTitle>
                    </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent class="diachi">
                <IonAlert 
                    isOpen={!(error === "")}
                    buttons={['OK']}
                    header={'Cảnh báo'}
                    message={error}
                    onDidDismiss={e=> setError("")}
                ></IonAlert>
                <IonAlert 
                    isOpen={!(success === "")}
                    buttons={['OK']}
                    header={'Thông báo'}
                    message={success}
                    onDidDismiss={e=> setSuccess("")}
                ></IonAlert>
                <IonItem>Thông tin địa chỉ mới</IonItem>
                <IonGrid>
                    <IonLabel class="label">Họ tên</IonLabel>
                    <IonInput class="input" onIonChange={e=> address.receiver_name=e.detail.value} value={address ? address.receiver_name: ""}></IonInput>
                    <IonLabel class="label">Điện thoại</IonLabel>
                    <IonInput class="input" type="number" onIonChange={e=> address.receiver_phone=e.detail.value} value={address ? address.receiver_phone: ""}></IonInput>
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
        : (loading) ? <Redirect to="/canhan"></Redirect>
        : 
        <IonPage>
            <IonHeader></IonHeader>
            <IonContent></IonContent>
        </IonPage>
    )
}

export default ThemDiaChi;