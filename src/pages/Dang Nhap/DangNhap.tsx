import React, { useState } from 'react';
import { IonInput, IonItemGroup, IonButton, IonContent, IonCard, withIonLifeCycle, IonPage } from '@ionic/react';
import './DangNhap.css';
import { createCookie } from '../../util/cookie';

const DangNhap: React.FC = () =>{

    const [error, setError] = useState(String);
    const [submitted, setSubmitted] = useState(false);
    const login = async () => {
        setError("");
        setSubmitted(true);
        var username = document.getElementById("username")?.getElementsByTagName("input")[0].value;
        var password = document.getElementById("password")?.getElementsByTagName("input")[0].value;
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            const token = await response.text();
            createCookie("access_token", token, 1);
            window.location.href = "/";
        } else {
            let error = null;
            switch (response.status) {
                case 401:
                    error = "Tài khoản hoặc mật khẩu không chính xác";
                    break;
                default:
                    error = "Lỗi hệ thống";
                    break;
            }
            setError(error);
            setSubmitted(false);
        }
    };

    return (
        <IonPage>
            <IonContent>
                <IonInput id="username" class="input" placeholder="Email"/>
                <IonInput id="password" class="input" type="password" placeholder="Mặt khẩu"/>
                <IonButton class="login_button" onClick={login}>Đăng Nhập</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default DangNhap;