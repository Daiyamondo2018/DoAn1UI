import React, { useState } from 'react';
import './TaiKhoan.css';
import { IonPage, IonHeader, IonToolbar, IonRow, IonIcon, IonCol, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonItemGroup, IonButton, useIonViewDidEnter, IonAlert } from '@ionic/react';
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
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        if(!response) {
            goback();
        }
        let data = await response.json();
        console.log(JSON.stringify(data));
    }

    const goback = () => {
        window.location.replace("/canhan");
    }

    const changePassword = async () => {
        
        if(!checkInput()) {
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
            setSuccess('Đã lưu mật khẩu mới thành công!');
        }
        else {
            switch (response.status) {
                case 401:
                    setError('Chưa đăng nhập!');
                    window.location.href = "/auth/login";
                    break;
                case 400:
                    setError('Mật khẩu cũ không đúng!');
                    break;
                default:
                    break;
            }
        }

    }

    const checkInput = () => {
        if(password.newPassword === "" || password.confirmPassword === ""
            || password.oldPassword === "" || !password.newPassword 
            || !password.confirmPassword || !password.oldPassword) {
            setError("Không được để trống các trường!");
            return false;
        }
        if (password.newPassword !== password.confirmPassword) {
            setError("Mật khẩu chưa trùng khớp!");
            return false;
        }
        if(password.newPassword.length < 6) {
            setError("Mật khẩu phải nhiều hơn 6 kí tự!");
            return false;
        }
        return true;
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
                <IonItem>Đổi mật khẩu</IonItem>
                <IonItemGroup>
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