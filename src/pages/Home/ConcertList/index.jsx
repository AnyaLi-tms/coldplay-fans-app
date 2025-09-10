import { Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useConcertListStore from '../../../store/concertListStore';
import Search from './Search';
import styles from './index.module.css';

function formatDate(dateStr) {
  // 假设 dateStr = "2023-09-13"
  const date = new Date(dateStr);
  const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
  return {
    week: `周${weekArr[date.getDay()]}`,
    day: date.getDate(),
    month: `${date.getMonth() + 1}月`,
    year: `${date.getFullYear()}年`,
  };
}

const ConcertList = () => {
  const navigate = useNavigate();
  const { concerts, fetchConcerts, loading } = useConcertListStore();

  useEffect(() => {
    fetchConcerts();
  }, [fetchConcerts]);

  const handleBuy = (id) => {
    navigate(`/concertdetail/${id}`);
  };

  return (
    <div className={styles['concert-container']}>
      <Search />
      <div>
        {loading && <div>加载中...</div>}
        {concerts.map((c) => {
          const { week, day, month, year } = formatDate(c.startDate);
          return (
            <div className={styles['card']} key={c.id}>
              {/* 日期 */}
              <div className={styles['date']}>
                <div className={styles['week']}>{week}</div>
                <div className={styles['day']}>{day}</div>
                <div className={styles['month']}>{month}</div>
                <div className={styles['year']}>{year}</div>
              </div>
              {/* 图片 */}
              <img src={c.imgUrl} alt={c.name} className={styles['cover']} />
              {/* 信息 */}
              <div className={styles['info']}>
                <div className={styles['title']}>{c.name}</div>
                {c.description && (
                  <div className={styles['desc']}>{c.description}</div>
                )}
                <div className={styles['venue']}>
                  {c.city} | {c.venue}
                </div>
              </div>
              {/* 按钮 */}
              <Button
                type="primary"
                className={styles['buy-btn']}
                onClick={() => handleBuy(c.id)}
              >
                {c.buttonText || '购买门票'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConcertList;
