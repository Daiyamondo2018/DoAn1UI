import React, { useState } from 'react';
import { IonPage, useIonViewDidEnter, withIonLifeCycle, IonContent, IonButton, IonItemGroup, IonItem, IonLabel, IonInput, IonRadioGroup, IonRadio, IonText, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonRow, IonCol, IonAlert } from '@ionic/react';
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
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
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
        if(!checkInput()) {
            return;
        }
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
            setSuccess(true);
        }
    }

    const checkInput = () => {
        if(userInfo.name === "" || userInfo.phone === ""
            || userInfo.email === "" || userInfo.gender === ""
            || userInfo.birthday === "") {
                setError("Không được để trống các trường!");
                return false;
        } 
        if(!userInfo.email.includes("@")) {
            setError("Email chưa đúng định dạng!");
            return false;
        }
        if(new Date(userInfo.birthday).getFullYear() <= 1900) {
            setError("Năm sinh phải lớn hơn 1900!");
            return false;
        }
        return true;
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
                        <IonTitle class="title">Thông tin cá nhân</IonTitle>
                    </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent class="thongtincanhan">
                <IonAlert 
                    isOpen={!(error === "")}
                    buttons={['OK']}
                    header={'Cảnh báo'}
                    message={error}
                    onDidDismiss={e=> setError("")}
                ></IonAlert>
                <IonAlert 
                    isOpen={success}
                    buttons={['OK']}
                    header={'Thông báo'}
                    message={"Lưu thông tin cá nhân thành công"}
                    onDidDismiss={e=> setSuccess(false)}
                ></IonAlert>
                <IonItem>Cá nhân</IonItem>
                <IonItemGroup>
                    <IonLabel class="label">Họ tên</IonLabel>
                    <IonInput class="input" id="name" value={userInfo.name} onIonChange = {e=> userInfo.name = e.detail.value}></IonInput>
                    <IonLabel class="label">Email</IonLabel>
                    <IonInput class="input" id="email" value={userInfo.email} onIonChange = {e=> userInfo.email = e.detail.value}></IonInput>
                    <IonLabel class="label">Số điện thoại</IonLabel>
                    <IonInput class="input" type="number" id="phone" value={userInfo.phone} onIonChange = {e=> userInfo.phone = e.detail.value}></IonInput>
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
                    <IonButton class="save_button" onClick={save}>Lưu</IonButton>
                </IonItemGroup>
            </IonContent>
        </IonPage>
    );
}

export default withIonLifeCycle(ThongTinCaNhan);