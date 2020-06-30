import React, { useState } from 'react';
import './DatHang.css';
import { IonPage, withIonLifeCycle, IonTitle, useIonViewDidEnter, IonGrid, IonRow, IonContent, IonCol, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import Header from '../ChiTiet/components/Header/Header';
import { getCart, removeFromCart } from '../../util/cart';
import { Laptop } from '../Trang Chu/components/LaptopBlock/LaptopBlock';
import { cart } from 'ionicons/icons';

const DatHang: React.FC = () => {

    const [changeData, setDataChange] = useState(false);
    const [products, setProducts] = useState<Laptop[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalNumber, setTotalNumber] = useState(0);

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

    return(
        <IonPage>
            <Header></Header>
            <IonContent>
                <IonRow>Địa chỉ giao hàng</IonRow>
                <IonRow>
                    <IonLabel class="label">Họ tên: </IonLabel>
                    <IonInput type="text"></IonInput>
                </IonRow>
                <IonRow>
                    <IonLabel class="label">Số điện thoại: </IonLabel>
                    <IonInput type="number"></IonInput>
                </IonRow>
                <IonRow>
                    <IonLabel class="label">Địa chỉ: </IonLabel>
                    <IonInput type="text"></IonInput>
                </IonRow>
                <IonRow>Danh sách sản phẩm</IonRow>
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
                <IonButton class="datmua" ion-button item-end>
                    <IonIcon icon={cart}></IonIcon>
                    Đặt mua
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default withIonLifeCycle(DatHang);