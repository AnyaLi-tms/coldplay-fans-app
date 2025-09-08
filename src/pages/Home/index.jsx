import Banner from './Banner';
import ConcertList from './ConcertList';
import ConcertDetail from '../../pages/Home/ConcertDetail';
import Login from '../../pages/Home/Login.jsx';
import { Routes, Route } from 'react-router-dom';
const Home = () => (
  <div>
    <Banner />
    <ConcertList />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concerts/:id" element={<ConcertDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>
);

export default Home;
