import styles from './index.module.css';
import { Dropdown, Space } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      key: 'order',
      label: '我的订单',
      onClick: () => {
        navigate('/order');
      },
    },
    {
      key: 'logout',
      label: '退出登录',
      onClick: () => {
        localStorage.removeItem('token');
        navigate('/');
      },
    },
  ];
  const isActive = location.pathname === '/order';
  return (
    <Dropdown
      className={styles.user}
      menu={{
        items,
        onClick: (e) => {
          const item = items.find((i) => i.key === e.key);
          if (item && item.onClick) item.onClick();
        },
      }}
      trigger={['hover']}
    >
      <a
        onClick={(e) => e.preventDefault()}
        className={isActive ? styles.active : ''}
      >
        <Space>我的</Space>
      </a>
    </Dropdown>
  );
};

export default User;
