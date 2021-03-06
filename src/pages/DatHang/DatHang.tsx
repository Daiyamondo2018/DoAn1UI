import React, { useState } from 'react';
import './DatHang.css';
import { IonPage, withIonLifeCycle, IonTitle, useIonViewDidEnter, IonGrid, IonRow, IonContent, IonCol, IonLabel, IonInput, IonButton, IonIcon, IonCard, IonButtons, IonAlert, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import Header from '../ChiTiet/components/Header/Header';
import { getCart, removeFromCart } from '../../util/cart';
import { Laptop, Promotion } from '../Trang Chu/components/LaptopBlock/LaptopBlock';
import { cart } from 'ionicons/icons';
import { getCookie, putArraytoLocalStorage } from '../../util/cookie';
import {ChiTietDiaChi} from '../Ca Nhan/pages/DiaChi/DiaChi';

const DatHang: React.FC = () => {

    const [products, setProducts] = useState<Laptop[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalNumber, setTotalNumber] = useState(0);
    const [addresses, setAddresses] = useState<ChiTietDiaChi[]>([]);
    const [address, setAddress] = useState(new ChiTietDiaChi());
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [rightInput, setRightInput] = useState(true);
    const [success, setSuccess] = useState("");

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

        await Promise.all([loadAddresses(), loadPromotions()]);
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

    const loadPromotions = async () => {
        const cart = getCart();        

        Object.keys(cart).forEach(async (id) => {
            const response = await fetch("/api/laptops/" + id + "/promotions");
            if (response.ok) {
                const data = await response.json();
                let oldPromotions = promotions;
                let newPromotions = oldPromotions.concat(data);
                setPromotions(newPromotions);
            }
        });
    };


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
                <IonCol>{(product.unit_price - product.discount_price).toLocaleString() + " đ"}</IonCol>
                <IonCol>{quantity}</IonCol>
                <IonCol>{((product.unit_price - product.discount_price) * quantity).toLocaleString() + " đ"}</IonCol>
            </IonRow>
        </IonGrid>
         : "")
    });

    const promotionBlock = promotions.map((promotion) => {
        console.log("p"+JSON.stringify(promotions));
        return ((promotions.length > 0) ?
            <IonGrid key={1}>
                <IonRow>
                    <IonCol>{promotion.name}</IonCol>
                    <IonCol>{promotion.price.toLocaleString() + " đ"}</IonCol>
                </IonRow>
            </IonGrid>
            : ""
        );
    })

    let date = new Date();
    let sendDate = new Date();
    sendDate.setDate(date.getDate() + 5);

    const createOrder = async () => {
        if(!address || !address.id) {
            setRightInput(false);
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
            setSuccess("Đặt hàng thành công!");
        }
    };

    const successOrder = () => {
        localStorage.removeItem("cart");
        window.location.replace("/donhang");
    }

    const selectedLocation = addresses.map((ad)=> {
        return (
            <IonSelectOption value={ad}>
                {ad.receiver_name + " - " + ad.receiver_phone}
            </IonSelectOption>
        );
    })

    return(
        <IonPage>
            <Header></Header>
            <IonContent class="dathang">
                <IonAlert 
                    isOpen={!rightInput}
                    buttons={['OK']}
                    header={'Cảnh báo'}
                    message={"Vui lòng thêm địa chỉ để tiến hành đặt hàng!"}
                    onDidDismiss={e=> setRightInput(true)}
                ></IonAlert>
                <IonAlert 
                    isOpen={!(success === "")}
                    buttons={['OK']}
                    header={'Thông báo'}
                    message={"Đặt hàng thành công!"}
                    onDidDismiss={e=> successOrder()}
                ></IonAlert>
                <IonRow></IonRow>
                <IonRow class="row_title">
                    <IonCol>ĐỊA CHỈ GIAO HÀNG</IonCol>
                </IonRow>
                <IonRow></IonRow>
                {(address && address.id) ? 
                <IonRow>
                    <IonCol class="row_title">Chọn địa chỉ</IonCol>
                    <IonCol>
                        <IonSelect onIonChange={e=> setAddress(e.detail.value)}>
                            {selectedLocation}
                        </IonSelect>
                    </IonCol>
                </IonRow>
                : 
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol>
                        <IonButton class="button_right" ion-button item-end href="/canhan">
                        Thêm địa chỉ
                        </IonButton>
                    </IonCol>
                </IonRow>
                }
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
                    <IonTextarea class="input" disabled={true}>
                    { address.id ? address.address_num +", " + address.street + ", " 
                        + address.ward+ ", "
                    + address.district + ", " +  address.city : ""}
                    </IonTextarea>
                </IonRow>
                <IonRow></IonRow>
                <IonRow class="row_title">
                    <IonCol>DANH SÁCH SẢN PHẨM</IonCol>
                </IonRow>
                <IonRow></IonRow>
                <IonRow class="table_title">
                    <IonCol>Sản phẩm</IonCol>
                    <IonCol>Đơn giá</IonCol>
                    <IonCol>Số lượng</IonCol>
                    <IonCol>Thành tiền</IonCol>
                </IonRow>
                {items}
                <IonRow></IonRow>
                <IonRow class="row_title">
                    <IonCol>DANH SÁCH KHUYẾN MÃI</IonCol>
                </IonRow>
                <IonRow></IonRow>
                <IonRow class="table_title">
                    <IonCol>Tên quà tặng</IonCol>
                    <IonCol>Giá trị</IonCol>
                </IonRow>
                {promotionBlock}
                <IonRow>
                    <IonCol>Tổng cộng:</IonCol>
                    <IonCol></IonCol>
                    <IonCol>{totalNumber}</IonCol>
                    <IonCol>{totalPrice.toLocaleString() + " đ"}</IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>Kiểm tra kỹ thông tin trước khi đặt mua</IonCol>
                    <IonCol>
                        <IonRow>
                            <IonCol>Ngày giao (dự kiến): </IonCol>
                            <IonCol>{(sendDate).toLocaleDateString() + " đ"}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Tạm tính: </IonCol>
                            <IonCol>{totalPrice.toLocaleString() + " đ"}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Phí vận chuyển: </IonCol>
                            <IonCol>{(45000).toLocaleString() + " đ"}</IonCol>
                        </IonRow>
                        <IonRow class="total">
                            <IonCol>Thành tiền:</IonCol>
                            <IonCol>{(totalPrice + 45000).toLocaleString() + " đ"}</IonCol>
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