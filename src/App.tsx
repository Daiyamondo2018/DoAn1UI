import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import TrangChu from './pages/Trang Chu/TrangChu';
import DanhMuc from './pages/Danh Muc/DanhMuc';
import TimKiem from './pages/Tim Kiem/TimKiem';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import DonHang from './pages/Don Hang/DonHang';
import GioHang from './pages/Gio Hang/GioHang';
import CaNhan from './pages/Ca Nhan/CaNhan';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/trangchu" component={TrangChu} exact={true} />
          <Route path="/danhmuc" component={DanhMuc} exact={true} />
          <Route path="/timkiem" component={TimKiem} />
          <Route path="/donhang" component={DonHang} exact={true}/>
          <Route path="/giohang" component={GioHang} exact={true}/>
          <Route path="/canhan" component={CaNhan} exact={true}/>
          <Route path="/" render={() => <Redirect to="/trangchu" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/trangchu">
            <IonIcon icon={triangle} />
            <IonLabel>Trang Chủ</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/danhmuc">
            <IonIcon icon={ellipse} />
            <IonLabel>Danh Mục</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/timkiem">
            <IonIcon icon={square} />
            <IonLabel>Tìm Kiếm</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/donhang">
            <IonIcon icon={square} />
            <IonLabel>Đơn Hàng</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab5" href="/giohang">
            <IonIcon icon={square} />
            <IonLabel>Giỏ Hàng</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab6" href="/canhan">
            <IonIcon icon={square} />
            <IonLabel>Cá Nhân</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
