import { Tabs } from 'antd';
//import styles from '../TabBar/index.module.css';

const items = [{ key: 'user', label: '我的' }];

const User = ({ onTabChange }) => (
  <Tabs
    defaultActiveKey="user"
    items={items}
    onChange={(key) => {
      if (onTabChange) onTabChange(key);
    }}
  />
);

export default User;
