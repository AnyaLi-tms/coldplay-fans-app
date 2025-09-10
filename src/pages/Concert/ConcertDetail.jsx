import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useConcertDetailStore } from '../../store/concertDetailStore';
import styles from './ConcertDetail.module.css';
function ConcertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { concert, loading, error, fetchDetail } = useConcertDetailStore();

  useEffect(() => {
    fetchDetail(id);
  }, [id, fetchDetail]);

  const contentMaxWidth = 1200;

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  if (!concert) {
    return null;
  }

  const posterUrl = concert.imgUrl;
  const seatMapUrl = concert.seatMapUrl;
  const isAvailable = concert.status === 'available';
  const isSoldOut = concert.status === 'sold';

  return (
    <div className={styles.container}>
      {/* 顶部内容：海报和右侧信息 */}
      <div className={styles.top} style={{ maxWidth: contentMaxWidth }}>
        {/* 左侧海报 */}
        <div className={styles.poster}>
          <img src={posterUrl} alt="海报" className={styles.posterImg} />
        </div>
        {/* 右侧信息 */}
        <div className={styles.info}>
          <div className={styles.title}>{concert.name}</div>
          <div className={styles.time}>
            {concert.startDate} {concert.startTime}
          </div>
          <div className={styles.location}>
            <span>📍</span>
            {concert.venue} {concert.city}
          </div>
        </div>
      </div>
      {/* 下方详情内容卡片 */}
      <div className={styles.card} style={{ maxWidth: contentMaxWidth }}>
        <div className={styles.sectionTitle}>活动内容</div>
        <div className={styles.sectionName}>{concert.name}</div>
        <div className={styles.sectionDate}>日期：{concert.startDate}</div>
        <div className={styles.sectionTime}>演出时间：{concert.startTime}</div>
        <div className={styles.sectionLocation}>
          地点：{concert.venue} {concert.city}
        </div>
        {concert.description && (
          <div className={styles.sectionDesc}>{concert.description}</div>
        )}
        <div className={styles.seatmap}>
          <img src={seatMapUrl} alt="座位图" className={styles.seatmapImg} />
        </div>
      </div>
      {/* 购票按钮 */}
      <div className={styles.btnArea} style={{ maxWidth: contentMaxWidth }}>
        <button
          className={isSoldOut ? `${styles.btn} ${styles.btnSold}` : styles.btn}
          disabled={!isAvailable}
          onClick={() => navigate(`/ticket/prices/${id}`)}
        >
          {isSoldOut ? '已售罄' : '立即购票'}
        </button>
      </div>
    </div>
  );
}

export default ConcertDetail;
