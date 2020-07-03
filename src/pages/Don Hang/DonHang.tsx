import React, { Component, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonLabel } from '@ionic/react';
import './DonHang.css';
import { isLogin } from '../../util/account';
import { Redirect } from 'react-router';
import { getCookie } from '../../util/cookie';
import { convertOrderStatus } from '../../util/converter';

const DonHang:React.FC = () =>{

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useIonViewDidEnter(async () => {
    setLoading(true);
    loadData();
    let authen = await isLogin();
    setAuthenticated(authen);
    setLoading(false);
  });

  const loadData = async () => {
    const url = '/api/users/me/orders';
    const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response.ok) {
        const orders = await response.json();
        const orderCount = response.headers.get("X-Total-Count");
        setOrders(orders);
        if(orderCount) {
          setOrderCount(parseInt(orderCount));
        }
    }
  };

  const goto_HomePage = () => {
    window.location.replace("/trangchu");
  }

  const goToDetailPage = (orderID: any) => {
    window.location.replace("/donhang/" + orderID);
  }

  const orderBlock = orders.map((order) => {
    return (
      <IonRow key={order["order"]["id"]} onClick={() => goToDetailPage(order["order"]["id"])}>
        <IonCol>{order["order"]["id"]}</IonCol>
        <IonCol>{order["order"]["order_date"]["dayOfMonth"] + "-" 
        + order["order"]["order_date"]["monthValue"] + "-" 
        + order["order"]["order_date"]["year"]}</IonCol>
        <IonCol>{order["order"]["delivery_date"]["dayOfMonth"] + "-" 
        + order["order"]["delivery_date"]["monthValue"] + "-" 
        + order["order"]["delivery_date"]["year"]}</IonCol>
        <IonCol>{parseInt(order["order"]["total_price"]).toLocaleString() + " đ"}</IonCol>
        <IonCol>{convertOrderStatus(order["order"]["status"])}</IonCol>
      </IonRow>

    );
  })
  
  return (
    (!isAuthenticated && !loading) ?
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Danh sách đơn hàng</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton href="/canhan" class="goto_login">
          Đăng nhập để xem danh sách đơn hàng
        </IonButton>
      </IonContent>
    </IonPage>
    : loading ? 
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent></IonContent>
    </IonPage>
    :<IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Danh Sách Đơn Hàng</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonLabel>Tổng số đơn hàng: {orderCount}</IonLabel>
        </IonRow>
        <IonGrid>
          <IonRow class="block_header">
            <IonCol>Mã đơn hàng</IonCol>
            <IonCol>Ngày mua</IonCol>
            <IonCol>Ngày giao</IonCol>
            <IonCol>Trị giá</IonCol>
            <IonCol>Trạng thái</IonCol>
          </IonRow>
          {orderBlock}
        </IonGrid>
        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonButton ion-button item-end onClick={goto_HomePage}>Tiếp tục mua sắm</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default DonHang;
