import React, { useState } from 'react';
import './TaiKhoan.css';
import { IonPage, IonHeader, IonToolbar, IonRow, IonIcon, IonCol, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonItemGroup, IonButton, useIonViewDidEnter } from '@ionic/react';
import { arrowBackOutline, eyeOutline } from 'ionicons/icons';
import { getCookie } from '../../../../util/cookie';

export class  Password {
    oldPassword: any;
    newPassword: any;        
    confirmPassword: any;
}


const TaiKhoan: React.FC = () => {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [password, setPassword] = useState(new Password());

    useIonViewDidEnter(async () => {
        fetchData();
    })

    const fetchData = async () => {
        const url = "/api/users/me";
        let response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            }
        });
        let data = await response.json();
        console.log(JSON.stringify(data));
    }

    const goback = () => {
        window.location.replace("/canhan");
    }

    const changePassword = async () => {
        if (password.newPassword !== password.confirmPassword) {
            alert("Vui lòng xác nhận lại mật khẩu");
            return;
        }

        const response = await fetch("/api/users/me/password", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('access_token'),
            },
            body: JSON.stringify(password),
        });

        if (response.ok) {
            alert('Đã lưu thông tin mới thành công')
        }
        else {
            switch (response.status) {
                case 401:
                    alert('Chưa đăng nhập');
                    window.location.href = "/auth/login";
                    break;
                case 400:
                    alert('Mật khẩu cũ không đúng');
                    break;
                default:
                    break;
            }
        }

    }

    return (
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
            <IonContent class="taikhoan">
               <IonItemGroup>
                    <IonItem class="title">Đổi mật khẩu</IonItem>
                    <IonLabel class="label">Mật khẩu cũ</IonLabel>
                    <IonInput class="input" type= {showOldPassword ? "text" : "password"} 
                        onIonChange = {e => password.oldPassword = e.detail.value}>
                        <IonIcon class="eye" size="large" item-end icon={eyeOutline}
                            onClick={e => setShowOldPassword(!showOldPassword)} >
                        </IonIcon>
                    </IonInput>
                    <IonLabel class="label">Mật khẩu mới</IonLabel>
                    <IonInput class="input" type= {showNewPassword ? "text" : "password"}  
                        onIonChange = {e => password.newPassword = e.detail.value}>
                        <IonIcon class="eye" size="large" item-end icon={eyeOutline}
                            onClick={e => setShowNewPassword(!showNewPassword)} >
                        </IonIcon>
                    </IonInput>
                    <IonLabel class="label">Nhập lại mật khẩu</IonLabel>
                    <IonInput class="input" type= {showConfirmPassword ? "text" : "password"}  
                        onIonChange = {e => password.confirmPassword = e.detail.value}>
                        <IonIcon class="eye" size="large" item-end icon={eyeOutline}
                            onClick={e => setShowConfirmPassword(!showConfirmPassword)} >
                        </IonIcon>
                    </IonInput>
                    <IonButton class="save_button" onClick={changePassword}>Lưu</IonButton>
               </IonItemGroup>
            </IonContent>
        </IonPage>
    );
}

export default TaiKhoan;