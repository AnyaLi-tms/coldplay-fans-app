import Banner from './Banner';
import ConcertList from './ConcertList';
import styles from './index.module.css';

const Home = () => (
  <div className={styles['home-container']}>
    <Banner />
    <ConcertList />
  </div>
);

export default Home;
