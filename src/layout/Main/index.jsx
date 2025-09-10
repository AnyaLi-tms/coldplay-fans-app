import Home from '../../pages/Home';
import ConcertDetail from '../../pages/Concert/ConcertDetail';
import TicketSelect from '../../pages/TicketSelect/TicketSelect';
import Payment from '../../pages/Payment';
import Order from '../../pages/Order/Order';
import Merchandise from '../../pages/Merchandise/Merchandise';
import { Routes, Route } from 'react-router-dom';
import MerchandisePayment from '../../pages/MerchandisePayment';
import styles from './index.module.css';

const Main = () => (
  <div className={styles.main}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concertdetail/:id" element={<ConcertDetail />} />
      <Route path="/ticket/prices/:id" element={<TicketSelect />} />
      <Route path="/ticket/payment" element={<Payment />} />
      <Route path="/merchandise" element={<Merchandise />} />
      <Route path="/order" element={<Order />} />
      <Route path="/merchandises/:id" element={<MerchandisePayment />} />
    </Routes>
  </div>
);

export default Main;
