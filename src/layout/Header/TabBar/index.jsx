import styles from './index.module.css';
import { Menu } from 'antd';

const items = [
  { key: 'home', label: '主页', path: '/' },
  { key: 'goods', label: '周边', path: '/goods' },
];

const TabBar = () => (
  <Menu
    className={styles.tabbar}
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['2']}
    items={items}
  />
);

export default TabBar;
