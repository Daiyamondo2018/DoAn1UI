import React, { Component, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonModal, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel, IonItem, IonImg, IonItemGroup, withIonLifeCycle, IonInput, IonRouterLink, IonSelect, IonSelectOption } from '@ionic/react';
import './CaNhan.css';
import { cart, close, home, alertOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router';
// import DangNhap from '../Dang Nhap/DangNhap';
// import DangKy from '../Dang Ky/DangKy';
// import QuenMatKhau from '../QuenMatKhau/QuenMatKhau';
import { createCookie, getCookie, removeCookie } from '../../util/cookie';
import ThongTinCaNhan from './pages/ThongTinCaNhan/ThongTinCaNhan';

const CaNhan: React.FC = ()=>{
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const fetchToken = async () => {
    const token = getCookie("access_token");
    const response = await fetch("/api/auth/token", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    if(response.ok) {
      setLogin(true);
      return await response.text();
    }
    setLogin(false);
    return null;
  };

  const token = fetchToken();

  const logout = async () => {
    removeCookie("access_token");
    window.location.href = "/canhan/dangnhap";
  }

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButtons>
              {(isLogin==false) && <IonTitle size="large">Cá Nhân</IonTitle>}
              {(isLogin==true) && <IonTitle size="large">Thông tin Tài khoản</IonTitle>}
              <IonButton ion-button item-end>
                  <IonIcon class="cart" icon={cart}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent>
      <IonModal isOpen={showModal} onDidDismiss={()=>{setShowModal(false)}}>
        <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/canhan/dangnhap" component={DangNhap} exact={true}></Route>
                <Route path="/canhan/dangky" component={DangKy} exact={true}></Route>
                <Route path="/canhan" component={DangNhap} exact={true}></Route>
                <Route path="/canhan/quen" component={QuenMatKhau} exact={true}></Route>
              </IonRouterOutlet>
              <IonTabBar slot="top">
                <IonTabButton tab="tab1" href="/canhan/dangnhap" selected={true}>
                  <IonIcon icon={home} class="icon_close"/>
                  <IonLabel>Đăng nhập</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/canhan/dangky">
                  <IonIcon icon={home} />
                  <IonLabel>Đăng ký</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/canhan/quen">
                  <IonIcon icon={alertOutline}/>
                  <IonLabel>Quên mật khẩu</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab4" onClick={()=>setShowModal(false)}>
                  <IonIcon icon={close}/>
                  <IonLabel>Close</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
      </IonModal>
      {(isLogin==false) && 
        <IonItem class="login_signup" onClick={() => setShowModal(true)}>
          <IonImg class="profile_picture" src="http://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"></IonImg>
          <IonItemGroup>
            <IonLabel class="static">Chào mừng bạn đến với UIT store </IonLabel>
            <IonLabel class="login_label static">Đăng nhập/Đăng ký</IonLabel>
          </IonItemGroup>
        </IonItem>
        }
        {(isLogin==true) && <IonItemGroup>
        <IonItem class="login_signup" onClick={()=>{window.location.replace("/thongtincanhan")}}>
          <IonImg class="profile_picture" src="http://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"></IonImg>
          <IonItemGroup>
            <IonLabel class="static">Chào mừng bạn trở lại với UIT store </IonLabel>
            <IonLabel class="login_label static">Xem thông tin cá nhân</IonLabel>
          </IonItemGroup>
        </IonItem>
        <IonButton class="logout_button" onClick={logout}>Đăng xuất</IonButton>
        </IonItemGroup>
      }
      </IonContent>
    </IonPage>
  );
};


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
          <IonContent class="content">
              <IonInput id="username" class="input" placeholder="Email"/>
              <IonInput id="password" class="input" type="password" placeholder="Mặt khẩu"/>
              <IonButton class="login_button" onClick={login}>Đăng Nhập</IonButton>
          </IonContent>
      </IonPage>
  );
}

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
      console.log(JSON.stringify(body));

      if (response.ok) {
          window.location.href = "/";
      }
  }
  return (
      <IonPage>
         <IonContent class="content">
              <IonInput id="name" class="input" placeholder="Họ tên" onIonChange={e => setName(String(e.detail.value))}/>
              <IonInput id="phone" class="input" placeholder="Số điện thoại" onIonChange={e => setPhone(String(e.detail.value))}/>
              <IonInput id="email" class="input" placeholder="Email" onIonChange={e => setEmail(String(e.detail.value))}/>
              <IonInput id="username" class="input" placeholder="Tài khoản" onIonChange={e => setUsername(String(e.detail.value))}/>
              <IonInput id="password" class="input" type="password" placeholder="Mật khẩu" onIonChange={e => setPassword(String(e.detail.value))}/>
              <IonInput id="re_password" class="input" type="password" placeholder="Nhập lại mật khẩu" onIonChange={e => setRePassword(String(e.detail.value))}/>
              <IonSelect placeholder="Giới tính" okText="Xác nhận" cancelText="Đóng" onIonChange={e => setGender(e.detail.value)}>
                  <IonSelectOption value="MALE">Nam</IonSelectOption>
                  <IonSelectOption value="FEMALE">Nữ</IonSelectOption>
                  <IonSelectOption value="OTHER">Khác</IonSelectOption>
              </IonSelect>
              <IonInput id="birthday" class="input" type="date" placeholder="Ngày sinh" onIonChange={e => setBirthday(String(e.detail.value))}/>
              <IonButton class="signup_button" onClick={signup}>Đăng Ký</IonButton>
         </IonContent>
      </IonPage>
  );
}

const QuenMatKhau: React.FC = () =>{

  return (
      <IonPage>
          <IonHeader>
            <IonTitle class="quen_title">
              Quên mật khẩu
            </IonTitle>
          </IonHeader>
          <IonContent class="content">
              <IonInput id="email" class="input" placeholder="Email"/>
              <IonButton href="/canhan/dangnhap" class="xacnhan_button">Xác nhận</IonButton>              
          </IonContent>
      </IonPage>
  );
}

export default CaNhan;
