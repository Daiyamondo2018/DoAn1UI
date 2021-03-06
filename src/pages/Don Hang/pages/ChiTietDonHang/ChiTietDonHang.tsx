import React, { useState } from 'react';
import './ChiTietDonHang.css';
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonIcon, IonCol, IonRow, useIonViewDidEnter, IonGrid, IonItemGroup, IonButton, IonLabel, IonInput, IonTextarea, IonItem, IonAlert } from '@ionic/react';
import Header from '../../../Trang Chu/components/Header/Header';
import { arrowBackOutline } from 'ionicons/icons';
import { getCookie } from '../../../../util/cookie';
import { Redirect } from 'react-router';
import { convertOrderStatus } from '../../../../util/converter';

type Props = {
    id: any;
}

export class Order {
    id: any;
    transport_fee: any;
    total_price: any;
    status: any;
    order_date: any;
    delivery_date: any;
    receiver_name: any;
    receiver_phone: any;
    address_num: any;
    street: any;
    ward: any;
    district: any;
    city: any;
}

export class Product {
    id: any;
    product_id: any;
    product_name: any;
    product_type: any;
    quantity: any;
    unit_price: any;
    total_price: any;
}

const ChiTietDonHang: React.FC<Props> = (props) => {

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(new Order());
    const [details, setDetails] = useState<Product[]>([]);
    const [deliveryDate, setDeliveryDate] = useState({});
    const [id, setID] = useState("");
    const [order_delete, setDeleteOrder] = useState(false);
    const [cancleSuccess, setCancleSuccess] = useState(false);

    const goback = () => {
        window.location.replace("/donhang");
    }

    const loadData = async () =>  {
        setLoading(true);
        let param = window.location.pathname;
        let paths = param.split("/");
        let ID = paths[paths.length-1];
        setID(ID);
        const response = await fetch('/api/orders/' + ID, {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const order = await response.json();
            console.log(JSON.stringify(order));
            setOrder(order);
            setDetails(order["details"]);
            setDeliveryDate(order["delivery_date"]);
        }
        setLoading(false);
    }

    useIonViewDidEnter(async () => {
        loadData();
    })

    const deleteOrder = async () => {
        setDeleteOrder(true);
        const response = await fetch('/api/orders/'+id+'/cancel', {
            method: "PUT",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        if (response.ok) {
            setCancleSuccess(true);
        }
        setDeleteOrder(false);
    }            

    let sumPrice = 0;

    const products = details.map((product) => {
        sumPrice = sumPrice + (product.product_type==="LAPTOP" ? product.total_price : 0);
        return(
            <IonRow>
                <IonCol>{product.product_name}</IonCol>
                <IonCol>{product.quantity}</IonCol>
                <IonCol>{product.unit_price.toLocaleString() + " đ"}</IonCol>
                <IonCol>{product.total_price.toLocaleString() + " đ"}</IonCol>
            </IonRow>
        );
    })

    return(
        (!loading && order.id) ? <IonPage>
           <IonHeader class="header">
                <IonToolbar>
                    <IonRow>
                    <IonIcon class="back" icon={arrowBackOutline} onClick={goback}></IonIcon>
                    <IonCol>
                        <IonTitle class="title">Chi tiết đơn hàng</IonTitle>
                    </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent class="chitietdonhang">
                <IonAlert
                    isOpen={cancleSuccess}
                    buttons={['OK']}
                    header={'Thông báo'}
                    message={"Hủy đơn hàng thành công!"}
                    onDidDismiss={e=> window.location.reload()}
                ></IonAlert>
                <IonItemGroup>
                    <IonGrid>
                        <IonRow>
                            <IonTitle>Chi tiết đơn hàng {id}</IonTitle>
                        </IonRow>
                        <IonRow  class="cancle">
                            <IonCol class="status"><IonLabel>Trạng thái: {convertOrderStatus(order.status)}</IonLabel></IonCol>
                            <IonCol>
                            {["PENDING", "RECEIVED"].includes(order.status) ? 
                                <IonButton class="huy" disabled={order_delete} onClick={deleteOrder}>Hủy đơn hàng</IonButton>
                            : "" }
                            </IonCol>
                        </IonRow>
                        <IonItem class="totalprice">Tổng phí thanh toán: {order.total_price.toLocaleString() + " đ"}</IonItem>
                    </IonGrid>
                </IonItemGroup>
                <IonRow></IonRow>
                <IonRow class="row_title">
                    <IonCol>THÔNG TIN GIAO HÀNG</IonCol>
                </IonRow>
                <IonRow></IonRow>
                <IonRow>
                    <IonLabel class="label">Họ tên: </IonLabel>
                    <IonInput class="input" disabled={true} value={order.receiver_name} type="text"></IonInput>
                </IonRow>
                <IonRow>
                    <IonLabel class="label">Số điện thoại: </IonLabel>
                    <IonInput class="input" disabled={true} value={order.receiver_phone} type="text"></IonInput>
                </IonRow>
                <IonRow>
                    <IonLabel class="label">Địa chỉ: </IonLabel>
                    <IonTextarea class="input" disabled={true} ion-text-wrap>
                    {order.address_num +", " + order.street + ", " 
                        + order.ward+ ", "
                    + order.district + ", " +  order.city}
                    </IonTextarea>
                </IonRow>
                <IonRow>
                    <IonLabel class="label">Ngày đặt</IonLabel>
                    <IonInput class="input" type="text" disabled={true} 
                    value={order["order_date"]["dayOfMonth"] + "-" 
                    + order["order_date"]["monthValue"] + "-"
                    + order["order_date"]["year"]}>
                    </IonInput>
                </IonRow>
                <IonRow>
                    <IonLabel class="label">Ngày giao</IonLabel>
                    <IonInput class="input" type="text" disabled={true} 
                    value={order["delivery_date"]["dayOfMonth"] + "-" 
                    + order["delivery_date"]["monthValue"] + "-"
                    + order["delivery_date"]["year"]}>
                    </IonInput>
                </IonRow>
                <IonRow class="row_title">
                    <IonCol>DANH SÁCH SẢN PHẨM</IonCol>
                </IonRow>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol>Sản phẩm</IonCol>
                    <IonCol>Số lượng</IonCol>
                    <IonCol>Đơn giá</IonCol>
                    <IonCol>Tổng tiền</IonCol>
                </IonRow>
                {products}
            </IonContent>
        </IonPage>
        : (!loading) ? <Redirect to="/canhan"></Redirect> 
        : <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent></IonContent>
        </IonPage>
    );

}

export default ChiTietDonHang;