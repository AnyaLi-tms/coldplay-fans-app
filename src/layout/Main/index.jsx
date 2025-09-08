import Home from '../../pages/Home';
import ConcertDetail from '../../pages/Concert/ConcertDetail';
import Login from '../../pages/Login/login';
import { Routes, Route } from 'react-router-dom';

const Main = () => (
  // 这里后续可根据路由展示不同页面
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concertdetail/:id" element={<ConcertDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>
);

export default Main;
