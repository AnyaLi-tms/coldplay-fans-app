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
  const selectedKey = items.find(
    (item) => item.path === location.pathname,
  )?.key;
  return (
    <Menu
      className={styles.tabbar}
      theme="dark"
      mode="horizontal"
      selectedKeys={selectedKey ? [selectedKey] : []}
      items={items.map((item) => ({
        ...item,
        onClick: () => navigate(item.path),
      }))}
    />
  );
};

export default TabBar;
