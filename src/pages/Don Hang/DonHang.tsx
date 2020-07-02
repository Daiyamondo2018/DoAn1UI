import React, { Component, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonGrid, IonRow, IonCol, IonButton, IonButtons } from '@ionic/react';
import './DonHang.css';
import { isLogin } from '../../util/account';
import { Redirect } from 'react-router';
import { getCookie } from '../../util/cookie';
import { convertOrderStatus } from '../../util/converter';

const DonHang:React.FC = () =>{

  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  useIonViewDidEnter(async () => {
    loadData();
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
        console.log(JSON.stringify(orders));
    }
  };

  const goToDetailPage = (orderID: any) => {
    window.location.replace("/donhang/" + orderID);
  }

  const orderBlock = orders.map((order) => {
    return (
      <IonRow onClick={() => goToDetailPage(order["order"]["id"])}>
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
     <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Danh Sách Đơn Hàng</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>Mã đơn hàng</IonCol>
            <IonCol>Ngày mua</IonCol>
            <IonCol>Ngày giao (dự kiến)</IonCol>
            <IonCol>Trị giá</IonCol>
            <IonCol>Trạng thái</IonCol>
          </IonRow>
          {orderBlock}
        </IonGrid>
        <IonButtons>
          <IonButton ion-button item-end href="/trangchu">Tiếp tục mua sắm</IonButton>
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default DonHang;
