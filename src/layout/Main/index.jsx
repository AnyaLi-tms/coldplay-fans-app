import Home from '../../pages/Home';

import { Routes, Route } from 'react-router-dom';

const Main = () => (
  // 这里后续可根据路由展示不同页面
  <div style={{ padding: 24 }}>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
);

export default Main;
