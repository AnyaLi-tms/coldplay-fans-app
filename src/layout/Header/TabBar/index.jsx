import { NavLink } from 'react-router-dom';
import styles from './index.module.css';

const items = [
  { key: 'home', label: '主页', path: '/' },
  { key: 'merchandise', label: '周边', path: '/merchandise' },
  { key: 'user', label: '我的', path: '/user' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TabBar = () => (
  <nav className={styles.tabbar} style={{ display: 'flex', gap: 24 }}>
    {items.map((item) => (
      <NavLink
        key={item.key}
        to={item.path}
        className={({ isActive }) =>
          classNames(styles.tab, isActive ? styles.active : '')
        }
        end={item.path === '/'}
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default TabBar;
