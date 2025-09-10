import styles from './index.module.css';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  { key: 'home', label: '主页', path: '/' },
  { key: 'merchandise', label: '周边', path: '/merchandise' },
];

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Menu
      className={styles.tabbar}
      theme="dark"
      mode="horizontal"
      selectedKeys={[
        items.find((item) => item.path === location.pathname)?.key || 'home',
      ]}
      items={items.map((item) => ({
        ...item,
        onClick: () => navigate(item.path),
      }))}
    />
  );
};

export default TabBar;
