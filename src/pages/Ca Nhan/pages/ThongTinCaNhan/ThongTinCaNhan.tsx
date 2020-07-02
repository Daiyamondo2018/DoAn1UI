import React, { useState } from 'react';
import { IonPage, useIonViewDidEnter, withIonLifeCycle, IonContent, IonButton, IonItemGroup, IonItem, IonLabel, IonInput, IonRadioGroup, IonRadio, IonText, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonRow, IonCol } from '@ionic/react';
import { getCookie, removeCookie } from '../../../../util/cookie';
import './ThongTinCaNhan.css';
import { arrowBackOutline } from 'ionicons/icons';

export class User_Info {
    id: any;
    username: any;
    password: any;
    name: any;
    email: any;
    phone: any;
    birthday: any;
    gender: any;
}


const ThongTinCaNhan: React.FC =() => {

    const [userInfo, setUser] = useState(new User_Info());
    let bday = "";
    const fetchData = async () => {
        const response = await fetch("/api/users/me", {
            method: "GET",
            headers: { Authorization: "Bearer " + getCookie("access_token") },
        });

        if (response.ok) {
            let user = await response.json();
            const birthday = user["birthday"];
            bday =  birthday["year"] + '-';
            let month = birthday["monthValue"]; 
            let day = birthday["dayOfMonth"]
            if(month<10) {
                bday = bday + "0" + month + "-";
            }
            else {
                bday = bday + month + "-";
            }
            if(day<10) {
                bday = bday + "0" + day;
            }
            else {
                bday = bday + day;
            }
            user.birthday = bday;
            console.log("day: " + bday);
            setUser(user);
        } else {
            if(response.status == 401) {
                window.location.href = "/canhan/dangnhap";
            }
        }
    };
    useIonViewDidEnter(async () => {
        await fetchData();
    });

    const save = async () => {
        const response = await fetch("/api/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify({
                name: userInfo.name,
                phone: userInfo.phone,
                email: userInfo.email,
                gender: userInfo.gender,
                birthday: new Date(userInfo.birthday).getTime(),
            }),
        });

        console.log("response: " + response);
        if (response.ok) {
            alert("Đã lưu thông tin mới thành công");
        }
    }

    const goback = () => {
        window.location.replace("/canhan");
    }

    return(
        <IonPage>
            <IonHeader class="header">
                <IonToolbar>
                    <IonRow>
                    <IonIcon class="back" icon={arrowBackOutline} onClick={goback}></IonIcon>
                    <IonCol>
                        <IonTitle class="title">Thông tin tài khoản</IonTitle>
                    </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent class="thongtincanhan">
                <IonItem>Cá nhân</IonItem>
                <IonItemGroup>
                    <IonLabel class="label">Họ tên</IonLabel>
                    <IonInput class="input" id="name" value={userInfo.name} onIonChange = {e=> userInfo.name = e.detail.value}></IonInput>
                    <IonLabel class="label">Email</IonLabel>
                    <IonInput class="input" id="email" value={userInfo.email} onIonChange = {e=> userInfo.email = e.detail.value}></IonInput>
                    <IonLabel class="label">Số điện thoại</IonLabel>
                    <IonInput class="input" id="phone" value={userInfo.phone} onIonChange = {e=> userInfo.phone = e.detail.value}></IonInput>
                    <IonLabel class="label">Ngày sinh</IonLabel>
                    <IonInput class="input" id="birthday" type="date" value={userInfo.birthday} onIonChange = {e=> userInfo.birthday = String(e.detail.value)}></IonInput>
                    <IonLabel class="label">Giới tính</IonLabel>
                    <IonRadioGroup class="gender_group" id="gender" value={userInfo.gender} onIonChange = {e=> userInfo.gender = e.detail.value}>
                        <IonRadio value="MALE"></IonRadio>
                        <IonText class="gender">Nam</IonText>
                        <IonRadio value="FEMALE"></IonRadio>
                        <IonText class="gender">Nữ</IonText>
                        <IonRadio value="ORTHER"></IonRadio>
                        <IonText class="gender">Khác</IonText>
                    </IonRadioGroup>
                    <IonButton class="save_button" onClick={save}>Lưu thay đổi</IonButton>
                </IonItemGroup>
            </IonContent>
        </IonPage>
    );
}

export default withIonLifeCycle(ThongTinCaNhan);