import React, { useState } from 'react';
import { IonItemGroup } from '@ionic/react';
import { Laptop } from '../../../Trang Chu/components/LaptopBlock/LaptopBlock';
import { getCookie } from '../../../../util/cookie';

const RatingBlock: React.FC = (prop: any)=> {

    const [rating, setRating] = useState();
    let product = new Laptop();
    product = prop.item;
    const buildRatingBody = () => {
        return {
            commentTitle: "",
            commentDetail: "",
            rating: rating,
        }
    }

    const postRating = async () => {
        const url = "/api/ratings?product-id=" + product.id;
        const body = buildRatingBody();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify(body),
        });
        const status = response.status;
        switch (status) {
            case 201:
                window.location.reload();
                break;
            case 403:
                break;
            case 401:
                alert("You have to login to access this page.");
                window.location.href = "/auth/login";
                break;
            default:
                break;
        }
    };

    const handleRatingChange = (value: any) => {
        setRating(value);
    }


    return(
        <IonItemGroup>
        </IonItemGroup>
    )
}
export default RatingBlock;