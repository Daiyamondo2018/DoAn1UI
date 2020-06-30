import React, { useState } from 'react';
import { IonItemGroup, IonImg, IonLabel, IonButton, IonGrid, IonCol, IonRow, IonCard, useIonViewDidEnter, withIonLifeCycle } from '@ionic/react';
import { Laptop, Promotion } from '../../../Trang Chu/components/LaptopBlock/LaptopBlock';
import './DetailBlock.css';
import { convertCPUType, convertResolutionType, convertBrandType } from '../../../../util/converter';


const DetailBlock: React.FC = (prop: any)=> {

    let product = new Laptop();
    product = prop.item;
    return( 
        <IonItemGroup>
            <IonCard>
                <IonLabel>Thông số kỹ thuật</IonLabel>
                <IonGrid>
                    <IonRow>
                        <IonCol>Thương hiệu:</IonCol>
                        <IonCol>{product.brand}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>CPU:</IonCol>
                        <IonCol>{convertCPUType(product.cpu.type) + 
                            " " + product.cpu.detail + " " + product.cpu.speed + " GHz"}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>RAM:</IonCol>
                        <IonCol>{product.ram.size + "GB " + product.ram.type 
                            + " " + product.ram.bus + " MHz" }{(product.ram.extra_slot===0)? " Không hỗ trợ thêm khe cắm" : " Có hỗ trợ thêm 1 khe cắm"}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Ổ cứng:</IonCol>
                        <IonCol>{product.hard_drive.size==1024 ? "1 TB" 
                            : product.hard_drive.size + " GB " + product.hard_drive.detail}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Màn hình:</IonCol>
                        <IonCol>{convertResolutionType(product.monitor.resolution_type + " " 
                            + product.monitor.resolution_width + "x" + product.monitor.resolution_height)}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Cổng kết nối:</IonCol>
                        <IonCol>{product.ports}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Hệ điều hành:</IonCol>
                        <IonCol>{product.os}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Card đồ họa:</IonCol>
                        <IonCol>{product.graphics_card}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Thiết kế:</IonCol>
                        <IonCol>{product.design}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Kích thước:</IonCol>
                        <IonCol>{product.thickness + " mm"}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Trọng lượng:</IonCol>
                        <IonCol>{product.weight + " kg"}</IonCol>
                    </IonRow>
                </IonGrid>
            </IonCard>
        </IonItemGroup>
    )
}
export default withIonLifeCycle(DetailBlock);