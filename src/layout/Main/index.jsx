import Home from '../../pages/Home';
import ConcertDetail from '../../pages/Home/ConcertDetail';
import { Routes, Route } from 'react-router-dom';

const Main = () => (
  // 这里后续可根据路由展示不同页面
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concertdetail/:id" element={<ConcertDetail />} />
    </Routes>
  </div>
);

export default Main;
