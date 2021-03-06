import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonModal, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel, IonItem, IonImg, IonItemGroup, withIonLifeCycle, IonInput, IonRouterLink, IonSelect, IonSelectOption, IonText, useIonViewDidEnter, IonRow, IonAlert } from '@ionic/react';
import './CaNhan.css';
import { cart, close, home, alertOutline, eyeOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router';
import { createCookie, getCookie, removeCookie, getArrayfromLocalStorage, putArraytoLocalStorage } from '../../util/cookie';
import { getCart, updateCart, updateCartQuantity } from '../../util/cart';

const CaNhan: React.FC = ()=>{
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useIonViewDidEnter(async () => {
    setLoading(true);
    fetchToken();
    setLoading(false);
  })

  let cartItems = getCart();
  const quantity = String(Object.values(cartItems).reduce((a: any, b: any) => a + b, 0));
  const logout = async () => {
    removeCookie("access_token");
    window.location.href = "/canhan";
  }
  
  return (
    <IonPage>
      <IonHeader class="header"> 
        <IonToolbar class="header_toolbar">
          <IonButtons>
            {(isLogin==false) && <IonTitle size="large">Cá nhân</IonTitle>}
            {(isLogin==true) && <IonTitle size="large">Thông tin cá nhân</IonTitle>}
            <IonButton href="/donhang/giohang" ion-button item-end>
                <IonIcon class="cart" icon={cart}>
                </IonIcon>
                <IonText id = "cart_count">{quantity}</IonText>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {(isLogin==false && !loading) ? 
      <IonTitle class="title_">Chào mừng bạn đến với UIT Store</IonTitle>
      : loading ? ""
      : <IonTitle class="title_">Chào mừng trở lại với UIT Store</IonTitle>
      }
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
      {(isLogin==false && !loading) ?
        <IonItem class="login_signup" onClick={() => setShowModal(true)}>
          <IonImg class="profile_picture" src="http://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"></IonImg>
          <IonItemGroup>
            <IonLabel class="login_label static">Đăng nhập/Đăng ký</IonLabel>
          </IonItemGroup>
        </IonItem>
        : loading ? <IonItem>Loading...</IonItem>
        :<IonItemGroup>
          <IonItem class="login_signup" onClick={()=>{window.location.replace("/canhan/taikhoan")}}>
            <IonImg class="profile_picture" src="http://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"></IonImg>
            <IonItemGroup>
              <IonLabel class="login_label static">Đổi mật khẩu</IonLabel>
            </IonItemGroup>
          </IonItem>
          <IonItem class="login_signup" onClick={()=>{window.location.replace("/canhan/thongtincanhan")}}>
            <IonImg class="profile_picture" src="http://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"></IonImg>
            <IonItemGroup>
              <IonLabel class="login_label static">Xem thông tin cá nhân</IonLabel>
            </IonItemGroup>
          </IonItem>
          <IonItem class="login_signup" onClick={()=>{window.location.replace("/canhan/diachi")}}>
            <IonImg class="profile_picture" src="http://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"></IonImg>
            <IonItemGroup>
              <IonLabel class="login_label static">Xem danh sách địa chỉ</IonLabel>
            </IonItemGroup>
          </IonItem>
          <IonItem class="login_signup" onClick={()=>{window.location.replace("/canhan/themdiachi")}}>
            <IonImg class="profile_picture" src="http://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"></IonImg>
            <IonItemGroup>
              <IonLabel class="login_label static">Thêm địa chỉ</IonLabel>
            </IonItemGroup>
          </IonItem>
          <IonButton class="logout_button" onClick={logout}>Đăng xuất</IonButton>
        </IonItemGroup>}
      </IonContent>
    </IonPage>
  );
};


const DangNhap: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [wrong, setWrong] = useState(false);
  const login = async () => {
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
      } 
      else {
        setWrong(true);
        setSubmitted(false);
      }
  };
  return (
      <IonPage>
         <IonHeader>
            <IonTitle class="quen_title">
              Đăng nhập
            </IonTitle>
          </IonHeader>
          <IonContent class="content">          
            <IonLabel class="label">Tên đăng nhập</IonLabel>
            <IonInput id="username" class="input" placeholder="Tên đăng nhập"/>
            <IonLabel class="label">Mật khẩu</IonLabel>
            <IonInput id="password" class="input" placeholder="Mặt khẩu"
              type = {showPassword ? "text" : "password"}>
              <IonIcon class="eye" size="large" item-end icon={eyeOutline}
                onClick={e => setShowPassword(!showPassword)} >
              </IonIcon>
            </IonInput>
            {wrong ? <IonLabel class="error">Tên đăng nhập hoặc mật khẩu không chính xác!</IonLabel>: ""}
            <IonButton class="login_button" onClick={login}>Đăng Nhập</IonButton>
          </IonContent>
      </IonPage>
  );
}

const DangKy: React.FC = () =>{

  const [error, setError] = useState("");
  const [gender, setGender] = useState("MALE");
  const [name, setName] = useState(String);
  const [phone, setPhone] = useState(String);
  const [email, setEmail] = useState(String);
  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);
  const [repassword, setRePassword] = useState(String);
  const [birthday, setBirthday] = useState(Date);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signup = async () => {

    if(!checkValidInput()) {
      return;
    }
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
      else {
       setError("Lỗi hệ thống!");
      }
  }

  const checkValidInput = () => {
    if(username === "" || password === "" || email === ""
      || name === "" ||gender === "" ||phone === "" 
      || birthday === "") {
        setError("Không được để trống các trường!");
        return false;
    }
    if(!email.includes('@')) {
      setError("Email chưa đúng định dạng!");
      return false;
    }
    if(password.length <6) {
      setError("Mật khẩu phải nhiều hơn 6 kí tự!");
      return false;
    }
    if(password != repassword) {
      setError("Mật khẩu chưa trùng khớp!");
      return false;
    }
    if(new Date(birthday).getFullYear() <= 1900) {
      setError("Năm sinh phải lớn hơn 1900!");
      return false;
    }
    return true;
  }

  return (
      <IonPage>
         <IonHeader>
            <IonTitle class="quen_title">
              Đăng ký
            </IonTitle>
          </IonHeader>
        <IonContent class="content">
          <IonLabel class="label">Họ tên</IonLabel>
          <IonInput id="name" class="input" placeholder="Họ tên" onIonChange={e => setName(String(e.detail.value))}/>
          <IonLabel class="label">Số điện thoại</IonLabel>
          <IonInput id="phone" class="input" type="number" placeholder="Số điện thoại" onIonChange={e => setPhone(String(e.detail.value))}/>
          <IonLabel class="label">Email</IonLabel>
          <IonInput id="email" class="input" type="email" placeholder="Email" onIonChange={e => setEmail(String(e.detail.value))}/>
          <IonLabel class="label">Tên đăng nhập</IonLabel>
          <IonInput id="username" class="input" placeholder="Tên đăng nhập" onIonChange={e => setUsername(String(e.detail.value))}/>
          <IonLabel class="label">Mật khẩu</IonLabel>
          <IonInput id="password" class="input" type= {showPassword ? "text" : "password"} placeholder="Mật khẩu" 
            onIonChange={e => setPassword(String(e.detail.value))}>
            <IonIcon class="eye" size="large" item-end icon={eyeOutline}
              onClick={e => setShowPassword(!showPassword)} >
            </IonIcon>
          </IonInput>
          <IonLabel class="label">Nhập lại mật khẩu</IonLabel>
          <IonInput id="re_password" class="input" type= {showConfirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" 
            onIonChange={e => setRePassword(String(e.detail.value))}>
            <IonIcon class="eye" size="large" item-end icon={eyeOutline}
              onClick={e => setShowConfirmPassword(!showConfirmPassword)} >
            </IonIcon>
          </IonInput>
          <IonLabel class="label">Giới tính</IonLabel>
          <IonSelect placeholder="Giới tính" value={gender} okText="Xác nhận" cancelText="Đóng" onIonChange={e => setGender(e.detail.value)}>
              <IonSelectOption defaultChecked={true} value="MALE">Nam</IonSelectOption>
              <IonSelectOption value="FEMALE">Nữ</IonSelectOption>
              <IonSelectOption value="OTHER">Khác</IonSelectOption>
          </IonSelect>
          <IonLabel class="label">Ngày sinh</IonLabel>
          <IonInput id="birthday" class="input" type="date" placeholder="Ngày sinh" onIonChange={e => setBirthday(String(e.detail.value))}/>
          {(error === "") ? "" :<IonLabel class="error">{error}</IonLabel>}
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
            <IonLabel class="label">Email</IonLabel>
              <IonInput id="email" class="input" placeholder="Email"/>
              <IonButton href="/canhan" class="xacnhan_button">Xác nhận</IonButton>              
          </IonContent>
      </IonPage>
  );
}

export default withIonLifeCycle(CaNhan);
