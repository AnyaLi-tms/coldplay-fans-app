import { Tabs } from 'antd';

const items = [
  { key: 'home', label: '主页' },
  { key: 'goods', label: '周边' },
  { key: 'mine', label: '我的' },
];

const Tabbar = ({ onTabChange }) => (
  <div
    style={{
      background: '#fff',
      borderBottom: '1px solid #eee',
      padding: '8px 0',
    }}
  >
    <Tabs
      defaultActiveKey="home"
      items={items}
      onChange={(key) => {
        // 阻止跳转，后续可加路由
        if (onTabChange) onTabChange(key);
      }}
    />
  </div>
);

export default Tabbar;
