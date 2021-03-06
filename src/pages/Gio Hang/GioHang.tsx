import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, withIonLifeCycle, useIonViewDidEnter, IonImg, IonCol, IonIcon, IonInput, IonButton, IonTitle, IonText } from '@ionic/react';
import './GioHang.css';
import { getCart, removeFromCart, addToCart } from '../../util/cart';
import { Laptop } from '../Trang Chu/components/LaptopBlock/LaptopBlock';
import { close, cart, car } from 'ionicons/icons';

const GioHang:React.FC = () =>{

  const [changeData, setDataChange] = useState(false);
  const [products, setProducts] = useState<Laptop[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useIonViewDidEnter( async () => {
    fetchData();
  })

  const fetchData = async () => {
    const cart = getCart();
    if (Object.keys(cart).length === 0) {
      setTotalPrice(0);
      setTotalDiscount(0);
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

  const click = () => {
    setDataChange(!changeData);
    fetchData();
    setDataChange(!changeData);
    console.log("clicked");
  }

  const loadCart = (products: Laptop[]) => {
    const cart = getCart();
    let totalPrice = 0;
    let totalDiscount = 0;

    products.forEach((product: Laptop) => {
        const quantity = cart[product.id];
        if(quantity > 0) {
          const discount = product.discount_price * quantity;
          const price = (product.unit_price - product.discount_price) * quantity;
          totalPrice += price;
          totalDiscount += discount;
        }
    });

    const productIds = products.map((product) => product.id.toString());
    Object.keys(cart)
        .filter((id) => !productIds.includes(id))
        .forEach((id) => removeFromCart(id));
        console.log("totalprice: " + JSON.stringify(totalPrice));
    setTotalPrice(totalPrice);
    setTotalDiscount(totalDiscount);
    setProducts(products)
  }

  const items = products.map( (product) => {
    let cart = getCart();
    if(cart.length == 0 ) {
      return ""
    }
    const quantity = cart[product.id];

    return ( (quantity > 0) ? <ProductItem click={click} product={product} key={product.id}></ProductItem> : "")
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonTitle>Giỏ hàng</IonTitle>
            <IonCol class="giohang_header">
              <IonButton class="rightbutton" href="/donhang/dathang" disabled={(totalPrice==0)}>
                <IonIcon class="black" icon={cart}></IonIcon>
                <IonText class="black">Tiến hành đặt hàng</IonText>
              </IonButton>
            </IonCol> 
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent class="giohang">
        <IonTitle class="thanhtien">Tổng thành tiền: {totalPrice.toLocaleString()+" đ"}</IonTitle>  
        <IonTitle class="giamgia">Tổng giảm giá: {totalDiscount.toLocaleString()+" đ"}</IonTitle>  
        {items}
        <IonRow>
          <IonCol></IonCol>
          <IonCol><IonButton class="continue" href="/trangchu">Tiếp tục mua sắm</IonButton></IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

type Props = {
  product: Laptop,
  click: any
}

export const ProductItem:  React.FC<Props> = props => {
  const [changeData, setDataChange] = useState(false);
  let product = props.product;
  let cart = getCart(); 
  useIonViewDidEnter(async () =>{
    
  })
  
  const decreaseQuantity = () => {
    let quantity = cart[product.id];
    props.click();
    if(quantity > 1) {
      addToCart(product.id, -1);
      setDataChange(!changeData);
    }
    else if(quantity == 1) {
      removeFromCart(product.id);
      setDataChange(!changeData);
    }
  }

  const increaseQuantity = () => {
    addToCart(product.id, 1);
    props.click();
    setDataChange(!changeData);
  }

  const removeItem = () => {
    removeFromCart(product.id);
    props.click();
    setDataChange(!changeData);
    console.log("remove");
  }

  let url = "/api/images/600/laptops/" + product.id+ "/" + decodeURI(product.name) + ".jpg";

  let quantity = cart[product.id];
  return(
    <IonRow class="item">
      <IonCol>
        <IonImg src={url}></IonImg>
      </IonCol>
      <IonCol>
        <IonRow class="name">{product.name}</IonRow>
        <IonRow class="price">{(product.unit_price - product.discount_price).toLocaleString()+" đ"}</IonRow>
        <IonRow class="discount_price">{product.unit_price.toLocaleString()+" đ"}</IonRow>
        <IonRow>
          <IonCol>
            <IonButton onClick={decreaseQuantity}>-</IonButton>
          </IonCol>
          <IonInput disabled={true} id="quantity" type="number" min="1" max="100" defaultValue={quantity} value={quantity}></IonInput>
          <IonCol>
            <IonButton onClick={increaseQuantity}>+</IonButton>
          </IonCol>
        </IonRow>
      </IonCol>
      <IonIcon onClick={removeItem}  icon={close}></IonIcon>
    </IonRow>
  );
  
};

export default withIonLifeCycle(GioHang);
