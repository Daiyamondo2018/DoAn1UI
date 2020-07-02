import React, { useState } from 'react';
import './DatHang.css';
import { IonPage, withIonLifeCycle, IonTitle, useIonViewDidEnter, IonGrid, IonRow, IonContent, IonCol, IonLabel, IonInput, IonButton, IonIcon, IonCard, IonButtons } from '@ionic/react';
import Header from '../ChiTiet/components/Header/Header';
import { getCart, removeFromCart } from '../../util/cart';
import { Laptop } from '../Trang Chu/components/LaptopBlock/LaptopBlock';
import { cart } from 'ionicons/icons';
import { getCookie } from '../../util/cookie';
import {ChiTietDiaChi} from '../Ca Nhan/pages/DiaChi/DaiChi';

const DatHang: React.FC = () => {

    const [changeData, setDataChange] = useState(false);
    const [products, setProducts] = useState<Laptop[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalNumber, setTotalNumber] = useState(0);
    const [addresses, setAddresses] = useState<ChiTietDiaChi[]>([]);
    const [address, setAddress] = useState(new ChiTietDiaChi());

    useIonViewDidEnter(async () => {
        fetchData();
    })
    const fetchData = async () => {
        const cart = getCart();
        if (Object.keys(cart).length === 0) {
            return;
        }

        const params = new URLSearchParams();
        Object.keys(cart).forEach((id) => params.append("ids", id));
        const response = await fetch("/api/laptops?" + params.toString());

        if (response.ok) {
            const products = await response.json();
            loadCart(products);
        }

        loadAddresses();
    }

    const loadCart = (products: Laptop[]) => {
    const cart = getCart();
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalNumber = 0;

    products.forEach((product: Laptop) => {
        const quantity = cart[product.id];
        if(quantity > 0) {
            const discount = product.discount_price * quantity;
            const price = (product.unit_price - product.discount_price) * quantity;
            totalPrice += price;
            totalDiscount += discount;
            totalNumber += quantity;
        }
    });

    const productIds = products.map((product) => product.id.toString());
        Object.keys(cart)
            .filter((id) => !productIds.includes(id))
            .forEach((id) => removeFromCart(id));
            console.log("totalprice: " + JSON.stringify(totalPrice));
        setTotalPrice(totalPrice);
        setTotalDiscount(totalDiscount);
        setProducts(products);
        setTotalNumber(totalNumber);
    }

    const loadAddresses = async () => {
        const response = await fetch("/api/users/me/addresses", {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const addresses_ = await response.json();
            setAddresses(addresses_);
            if(addresses_[0]) {
                setAddress(addresses_[0]);
            }
        }
    };
    
    const items = products.map( (product) => {
        let cart = getCart();
        if(cart.length == 0 ) {
          return ""
        }
        const quantity = cart[product.id];
    
        return ( (quantity > 0) ? 
        <IonGrid>
            <IonRow>
                <IonCol>{product.name}</IonCol>
                <IonCol>{(product.unit_price - product.discount_price).toLocaleString()}</IonCol>
                <IonCol>{quantity}</IonCol>
                <IonCol>{((product.unit_price - product.discount_price) * quantity).toLocaleString()}</IonCol>
            </IonRow>
        </IonGrid>
         : "")
    });

    let date = new Date();
    let sendDate = new Date();
    sendDate.setDate(date.getDate() + 5);

    const createOrder = async () => {
        if(!address || !address.id) {
            alert("Vui lòng thêm địa chỉ để tiến hành đặt hàng!");
            return;
        }
        const cart = getCart();
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                addressId: address.id,
                cartJSON: JSON.stringify(cart),
            }),
        });

        if (response.ok) {
            localStorage.setItem("cart", "");
            window.location.replace("/donhang");
        }
    };

    return(
        <IonPage>
            <Header></Header>
            <IonContent class="dathang">
                <IonRow></IonRow>
                <IonRow class="row_title">
                    <IonCol>ĐỊA CHỈ GIAO HÀNG</IonCol>
                    {(address && address.id) ? "" 
                    : <IonCol>
                        <IonButton class="button_right" ion-button item-end href="/diachi">
                            Thêm địa chỉ</IonButton>
                    </IonCol>}
                </IonRow>
                <IonRow></IonRow>
                <IonRow>
                    <IonLabel class="label">Họ tên: </IonLabel>
                    <IonInput class="input" disabled={true} value={address.id ? address.receiver_name : ""} type="text"></IonInput>
                </IonRow>
                <IonRow>
                    <IonLabel class="label">Số điện thoại: </IonLabel>
                    <IonInput class="input" disabled={true} value={address.id ? address.receiver_phone : ""} type="text"></IonInput>
                </IonRow>
                <IonRow>
                    <IonLabel class="label">Địa chỉ: </IonLabel>
                    <IonInput class="input" disabled={true}
                    value ={ address.id ? address.address_num +", " + address.street + ", " 
                        + address.ward+ ", "
                    + address.district + ", " +  address.city : ""} type="text">
                    </IonInput>
                </IonRow>
                <IonRow></IonRow>
                <IonRow class="row_title">
                    <IonCol>DANH SÁCH SẢN PHẨM</IonCol>
                </IonRow>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol>Sản phẩm</IonCol>
                    <IonCol>Đơn giá</IonCol>
                    <IonCol>Số lượng</IonCol>
                    <IonCol>Thành tiền</IonCol>
                </IonRow>
                {items}
                <IonRow>
                    <IonCol>Tổng cộng:</IonCol>
                    <IonCol></IonCol>
                    <IonCol>{totalNumber}</IonCol>
                    <IonCol>{totalPrice}</IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>Kiểm tra kỹ thông tin trước khi đặt mua</IonCol>
                    <IonCol>
                        <IonRow>
                            <IonCol>Ngày giao (dự kiến): </IonCol>
                            <IonCol>{(sendDate).toLocaleDateString()}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Tạm tính: </IonCol>
                            <IonCol>{totalPrice.toLocaleString()}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Phí vận chuyển: </IonCol>
                            <IonCol>{(totalPrice*5/1000).toLocaleString()}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Thành tiền:</IonCol>
                            <IonCol>{(totalPrice*1.005).toLocaleString()}</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonButton onClick={createOrder} class="datmua" ion-button item-end>
                    <IonIcon icon={cart}></IonIcon>
                    Đặt mua
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default withIonLifeCycle(DatHang);