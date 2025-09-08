import { Carousel } from 'antd';
import banner1 from '../../../assets/banner-01.webp';
import banner2 from '../../../assets/banner-02.webp';
import banner3 from '../../../assets/banner-03.webp';
import banner4 from '../../../assets/banner-04.webp';
import styles from './index.module.css';

const bannerList = [
  { img: banner1, alt: 'banner1' },
  { img: banner2, alt: 'banner2' },
  { img: banner3, alt: 'banner3' },
  { img: banner4, alt: 'banner4' },
];

const Banner = () => (
  <div className={styles.banner}>
    <Carousel autoplay>
      {bannerList.map((b) => (
        <div className={styles['banner-item']} key={b.img}>
          <img src={b.img} alt={b.alt} className={styles['banner-img']} />
        </div>
      ))}
    </Carousel>
  </div>
);

export default Banner;
