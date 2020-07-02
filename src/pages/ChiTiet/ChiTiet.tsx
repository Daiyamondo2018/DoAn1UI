import React, {Component, useState} from 'react';
import { IonPage, IonTitle, IonContent, useIonViewWillEnter, IonHeader, IonCard, IonCardTitle, IonCardHeader, withIonLifeCycle, useIonViewDidEnter, IonIcon, IonLabel, IonRouterLink, IonRow } from '@ionic/react';
import { Laptop, Promotion } from '../Trang Chu/components/LaptopBlock/LaptopBlock';
import Header from './components/Header/Header';
import { getCookie } from '../../util/cookie';
import { convertBrandType } from '../../util/converter';
import OverviewBlock from './components/OverviewBlock/OverviewBlock';
import './ChiTiet.css';
import DetailBlock from './components/DetailBlock/DetailBlock';
import HLaptopBlock from '../KetQua/HLaptopBlock/HLaptopBlock';

const ChiTiet:React.FC = ()=>{

    const [items, setItems] = useState<Laptop[]>([]);
    const [item, setItem] = useState<Laptop>(new Laptop);
    const [ratings, setRatings] = useState([]);
    const [replies, setReplies] = useState([]);
    const [promotions, setPromotions] = useState<Promotion[]>([]);

    useIonViewDidEnter(async () => {
        await fetchData();
    });

    async function fetchData() {
        const path = window.location.pathname;
        const productId = path.split("/").slice(-1).pop();
        await Promise.all([loadProduct(productId), loadRating(productId), loadAnotherProduct()]);
        //const ratingIds = ratings.map((rating) => rating["id"]);
        console.log(ratings);
    }

    const loadProduct = async (productId: any) => {
        const response = await fetch(`/api/laptops/${productId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('access_token'),
            }
        });
        if (response.ok) {
            const product = await response.json();
            const promotionsResponse = await fetch("/api/laptops/" + product.id + "/promotions");
            if (promotionsResponse.ok) {
                const pms = await promotionsResponse.json();
                setPromotions(pms);
            }
            setItem(product);
        } else {
            window.location.href = "/";
        }
    };

    const loadRatingReplies = async (ratingIds:[]) => {
        const params = new URLSearchParams();
        ratingIds.forEach(id => params.append('rating-ids', id));
        const url = '/api/replies?' + params.toString();
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            const replies = await response.json();
            setReplies(replies);
        }
    }

    const loadAnotherProduct = async () => {
        const url = "/api/laptops/types/default";
        let response = await fetch(url);
        let data = await response.json();
        setItems(data);
    }


    const loadRating = async (productId:any ) => {
        const response = await fetch(`/api/ratings/${productId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('access_token'),
            }
        });
        if (response.ok) {
            const rts = await response.json();
            console.log("ratings: " + rts);
            setRatings(rts);
        }
    }

    const ProductTitle = (props:any) => {
        const { product } = props;
        return (
            <IonLabel class="title">
                <IonRouterLink href="/" class="productRedirect">
                    Trang chủ
                </IonRouterLink>
                &nbsp;
                <IonRouterLink href="/" class = "productRedirect">
                    {convertBrandType(product?.["brand"])}
                </IonRouterLink>
                &nbsp;Laptop {product?.["name"]}
            </IonLabel>
        );
    };

    return(
        <IonPage>
            <Header/>
            <IonContent>
                <IonTitle class="title">Thông tin chi tiết</IonTitle>
                <OverviewBlock promotions={promotions} item = {item}></OverviewBlock>
                <DetailBlock item = {item}></DetailBlock>
                <IonLabel>Sản phẩm khác</IonLabel>
                <HLaptopBlock items={items}></HLaptopBlock>
            </IonContent>
        </IonPage>
    );
} 

export default withIonLifeCycle(ChiTiet);