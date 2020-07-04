import React, { useState } from 'react';
import { IonItemGroup, IonImg, IonLabel, IonButton, IonGrid, IonCol, IonRow, IonCard, useIonViewDidEnter, withIonLifeCycle, IonInput, IonIcon, IonText } from '@ionic/react';
import { Laptop, Promotion } from '../../../Trang Chu/components/LaptopBlock/LaptopBlock';
import './OverviewBlock.css';
import { convertCPUType, convertResolutionType } from '../../../../util/converter';
import { cart } from 'ionicons/icons';
import { addToCart, MAXIMUM_QUANTITY_PER_PRODUCT } from '../../../../util/cart';

export type Props = {
    item: Laptop;
    promotions: Promotion[];
}

const OverviewBlock: React.FC<Props> = (prop)=> {
    let product = prop.item;
    let promotions = prop.promotions;
    let url = "api/images/400/laptops/" + product.id + "/"+product.alt + ".jpg";
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if(quantity>1) {
            setQuantity(quantity-1);
        }
    }
    
    const increaseQuantity = () => {
        setQuantity(quantity+1);
    }
    

    const addQuantityToCart = (productId: any) => {

        let quantityInput = document.getElementById("quantity")?.getElementsByTagName("input")[0].value;
        if(quantityInput) {
            const quantity = parseInt(quantityInput);
            console.log("quantityInput: " + quantity);
            const success = addToCart(productId, quantity);
            const quantityError = document.getElementById("quantity-error");
            if (!success) {
                if(quantityError) {
                    quantityError.style.display = "inline-block";
                }
            } else {
                if(quantityError) {
                    quantityError.style.display = "none";
                }
            }
        }
    }

    return( 
        <IonItemGroup>
            <IonImg class="product_image" src={url}></IonImg>
            <IonLabel class="product_name">Laptop {product.name}</IonLabel>
            <IonLabel class="current_price">
                {(product.unit_price - product.discount_price).toLocaleString()}đ
            </IonLabel>
            <IonLabel class="unit_price">{Number(product.unit_price).toLocaleString()}</IonLabel>
            <IonLabel class="discount_price">{Number(product.discount_price).toLocaleString()}</IonLabel>
            <IonRow>
                <IonCol>
                    <IonRow>
                        <IonLabel class="label">Số lượng</IonLabel>
                        <IonCol>
                            <IonButton onClick={decreaseQuantity}>-</IonButton>
                        </IonCol>
                        <IonInput id="quantity" type="number" min="1" max="100" defaultValue={quantity} value={quantity}></IonInput>
                        <IonCol>
                            <IonButton onClick={increaseQuantity}>+</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => addQuantityToCart(product.id)}>
                            <IonIcon icon={cart}></IonIcon>
                                &nbsp;&nbsp;
                            Thêm vào giỏ hàng</IonButton>
                        </IonCol>
                    </IonRow>                
                </IonCol>
            </IonRow>
            {/* <IonLabel id="quantity-error">
                Tối đa {MAXIMUM_QUANTITY_PER_PRODUCT} sản phẩm {product.name} trong giỏ hàng
            </IonLabel> */}
            <IonCard>
                <IonLabel class="title">Thông số cơ bản</IonLabel>
                <IonGrid>
                    <IonRow class="label">
                        <IonCol>CPU:</IonCol>
                        <IonCol>{convertCPUType(product.cpu.type) + 
                            " " + product.cpu.detail + " " + product.cpu.speed + " GHz"}
                        </IonCol>
                    </IonRow>
                    <IonRow class="label">
                        <IonCol>RAM:</IonCol>
                        <IonCol>{product.ram.size + "GB " + product.ram.type 
                            + " " + product.ram.bus + " MHz"}
                        </IonCol>
                    </IonRow>
                    <IonRow class="label">
                        <IonCol>Ổ cứng:</IonCol>
                        <IonCol>{product.hard_drive.size==1024 ? "1 TB" 
                            : product.hard_drive.size + " GB " + product.hard_drive.detail}
                        </IonCol>
                    </IonRow>
                    <IonRow class="label">
                        <IonCol>Màn hình:</IonCol>
                        <IonCol>{convertResolutionType(product.monitor.resolution_type + " " 
                            + product.monitor.resolution_width + "x" + product.monitor.resolution_height)}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCard>
            <IonCard>
                <IonLabel class="title">Quà khuyến mãi</IonLabel>
                {
                    promotions.map((promotion) => { 
                        console.log("promotion: " + JSON.stringify(promotion));
                        return (
                        <IonRow class="promotion" key={promotion.id}>
                            <IonImg class="image" title={promotion.name} src={"/api/images/200/promotions/" + promotion.id +"/" + promotion.alt +".jpg"}></IonImg>
                            <IonCol><IonLabel class="label" className="ion-text-wrap">{promotion.name + " " + promotion.price.toLocaleString() + "đ"}</IonLabel></IonCol>
                        </IonRow>
                    ) })
                }
            </IonCard>
        </IonItemGroup>
    )
}
export default withIonLifeCycle(OverviewBlock);