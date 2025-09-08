import styles from './index.module.css';
import Logo from './Logo';
import TabBar from './TabBar';
import User from './User';

const Header = () => (
  <div className={styles.header}>
    <Logo />
    <div className={styles['tabs-container']}>
      <TabBar />
    </div>
  </div>
);

export default Header;
