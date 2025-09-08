import { Carousel } from 'antd';

const bannerList = [
  { img: '../../assets/banner-01.webp', alt: 'banner1' },
  { img: '../../assets/banner-02.webp', alt: 'banner2' },
  { img: '../../assets/banner-03.webp', alt: 'banner3' },
  { img: '../../assets/banner-04.webp', alt: 'banner4' },
];

const Banner = () => (
  <Carousel autoplay style={{ marginBottom: 24 }}>
    {bannerList.map((b) => (
      <img
        key={b.img}
        src={b.img}
        alt={b.alt}
        style={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
          borderRadius: 8,
        }}
      />
    ))}
  </Carousel>
);

export default Banner;
