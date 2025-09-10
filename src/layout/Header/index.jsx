import styles from './index.module.css';
import Logo from './Logo';
import TabBar from './TabBar';
import User from './User';

import { Layout } from 'antd';

const { Header } = Layout;

const Head = () => (
  <Header className={styles.header}>
    <Logo />
    <TabBar />
    <User />
  </Header>
);

export default Head;
