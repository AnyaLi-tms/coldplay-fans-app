import { Tabs } from 'antd';
import styles from './index.module.css';

const items = [
  { key: 'home', label: '主页' },
  { key: 'goods', label: '周边' },
  { key: 'user', label: '我的' },
];

const TabBar = ({ onTabChange }) => (
  <Tabs
    defaultActiveKey="home"
    items={items}
    onChange={(key) => {
      // 阻止跳转，后续可加路由
      if (onTabChange) onTabChange(key);
    }}
  />
);

export default TabBar;
