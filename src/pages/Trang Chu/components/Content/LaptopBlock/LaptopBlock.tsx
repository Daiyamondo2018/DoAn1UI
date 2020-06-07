import React, { Component } from 'react';
import { render } from '@testing-library/react';
import { IonImg, IonLabel, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';

class LaptopBlock extends Component {
    render() {   
        return(
            <IonCard>
                <IonCardHeader>Header</IonCardHeader>
                <IonCardContent>
                    <IonImg src = ""></IonImg>
                </IonCardContent>
            </IonCard>
        );
    }
};
export default LaptopBlock;