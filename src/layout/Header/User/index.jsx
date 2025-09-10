import styles from './index.module.css';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: 'order',
      label: '我的订单',
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
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>我的</Space>
      </a>
    </Dropdown>
  );
};

export default User;
