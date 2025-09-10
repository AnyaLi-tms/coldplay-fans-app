import { Carousel } from 'antd';
import { useEffect } from 'react';
import useBannerStore from '../../../store/bannerStore';
import styles from './index.module.css';

const Banner = () => {
  const { banners, fetchBanners, loading } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return (
    <div className={styles.banner}>
      <Carousel autoplay arrows>
        {loading && <div>加载中...</div>}
        {banners.map((b) => (
          <div className={styles['banner-item']} key={b.id || b.img}>
            <a href={b.link} target="_blank" rel="noopener noreferrer">
              <img
                src={b.imgUrl}
                alt={b.name}
                className={styles['banner-img']}
              />
            </a>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
