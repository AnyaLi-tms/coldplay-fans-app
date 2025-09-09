import Home from '../../pages/Home';
import ConcertDetail from '../../pages/Concert/ConcertDetail';
import Login from '../../pages/Login/login';
import { Routes, Route } from 'react-router-dom';
import styles from './index.module.css';

const Main = () => (
  <div className={styles.main}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concertdetail/:id" element={<ConcertDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>
);

export default Main;
