import React, { useState } from 'react';
import { IonInput, IonItemGroup, IonButton, IonContent, IonCard, withIonLifeCycle, IonPage, IonSelect, IonItemOptions, IonItemOption, IonSelectOption } from '@ionic/react';
import './DangKy.css';

const DangKy: React.FC = () =>{

    const [gender, setGender] = useState(String);
    const [name, setName] = useState(String);
    const [phone, setPhone] = useState(String);
    const [email, setEmail] = useState(String);
    const [username, setUsername] = useState(String);
    const [password, setPassword] = useState(String);
    const [repassword, setRePassword] = useState(String);
    const [birthday, setBirthday] = useState(Date);

    const signup = async () => {
        let body = {
            username: username.trim().replace(/ +g/, " "),
            password: password,
            confirm: repassword,
            email: email.trim(),
            name: name.trim().replace(/ +g/, " "),
            gender: gender,
            phone: phone,
            birthday: new Date(birthday).getTime(),
        }
        const url = "/api/auth/register";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            window.location.href = "/";
        }
    }
    return (
        <IonPage>
           <IonContent>
                <IonInput id="name" class="input" placeholder="Họ tên" onIonChange={e => setName(String(e.detail.value))}/>
                <IonInput id="phone" class="input" placeholder="Số điện thoại" onIonChange={e => setPhone(String(e.detail.value))}/>
                <IonInput id="email" class="input" placeholder="Email" onIonChange={e => setEmail(String(e.detail.value))}/>
                <IonInput id="username" class="input" placeholder="Tài khoản" onIonChange={e => setUsername(String(e.detail.value))}/>
                <IonInput id="password" class="input" type="password" placeholder="Mật khẩu" onIonChange={e => setPassword(String(e.detail.value))}/>
                <IonInput id="re_password" class="input" type="password" placeholder="Nhập lại mật khẩu" onIonChange={e => setRePassword(String(e.detail.value))}/>
                <IonSelect placeholder="Giới tính" okText="Xác nhận" cancelText="Đóng" onIonChange={e => setGender(e.detail.value)}>
                    <IonSelectOption value="Nam">Nam</IonSelectOption>
                    <IonSelectOption value="Nữ">Nữ</IonSelectOption>
                </IonSelect>
                <IonInput id="birthday" class="input" type="date" placeholder="Ngày sinh" onIonChange={e => setBirthday(String(e.detail.value))}/>
                <IonButton class="signup_button" onClick={signup}>Đăng Ký</IonButton>
           </IonContent>
        </IonPage>
    );
}

export default DangKy;