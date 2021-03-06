import React, { useState } from 'react';
import './DiaChi.css';
import { IonPage, IonHeader, IonToolbar, IonRow, IonIcon, IonCol, IonTitle, IonContent, IonGrid, IonLabel, IonInput, IonButton, useIonViewDidEnter, IonItem, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';
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

const DiaChi: React.FC = () => {

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

    useIonViewDidEnter(async () => {
        setLoading(true);
        loadAddresses();
        setLoading(false);
    })

    const loadAddresses = async () => {
        const response = await fetch("/api/users/me/addresses", {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const addresses_ = await response.json();
            setLogin(true);
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
            setSuccess("Cập nhật thông tin địa chỉ thành công!");
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

    const selectedLocation = addresses.map((ad)=> {
        return (
            <IonSelectOption value={ad}>
                {ad.receiver_name + " - " + ad.receiver_phone}
            </IonSelectOption>
        );
    })

    return (
        (loading || login) ?
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
            {
                (address && address.id) ?
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
                <IonItem>Danh sách địa chỉ</IonItem>
                <IonRow>
                    <IonCol class="row_title">Chọn địa chỉ</IonCol>
                    <IonCol>
                        <IonSelect placeholder="Mặc định" onIonChange={e=>setAddress(e.detail.value)}>
                            {selectedLocation}
                        </IonSelect>
                    </IonCol>
                </IonRow>
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
            : 
            <IonContent class="diachi">
                <IonItem>Danh sách trống!</IonItem>
                <IonButton class="save_button" href="/canhan/themdiachi">Thêm địa chỉ</IonButton>
            </IonContent>
            }
        </IonPage> 
        : (loading) ? <Redirect to="/canhan"></Redirect>
        : 
        <IonPage>
            <IonHeader></IonHeader>
            <IonContent></IonContent>
        </IonPage>
    )
}

export default DiaChi;