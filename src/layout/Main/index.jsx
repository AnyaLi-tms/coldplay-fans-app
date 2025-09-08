import Home from '../../pages/Home';
import Login from '../../pages/Home/Login';
import ConcertDetail from '../../pages/Home/ConcertDetail';
import { Routes, Route } from 'react-router-dom';

const Main = () => (
  // 这里后续可根据路由展示不同页面
  <div style={{ padding: 24 }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concertdetail/:id" element={<ConcertDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>
);

export default Main;
