import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import seatImg from '../../img/seatmap.png';
import api from '../../services/api';

function ConcertDetail() {
  const { id } = useParams();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/concerts/${id}`)
      .then((data) => {
        setConcert(data);
        setLoading(false);
      })
      .catch(() => {
        setError('获取演唱会详情失败');
        setLoading(false);
      });
  }, [id]);

  // 卡片最大宽度与首页一致
  const contentMaxWidth = 1200;

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 80 }}>加载中...</div>;
  }
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: 80, color: 'red' }}>
        {error}
      </div>
    );
  }
  if (!concert) {
    return null;
  }

  const posterUrl = concert.imgUrl;
  const seatMapUrl = concert.seatMapUrl;

  const isAvailable = concert.status === 'available';
  return (
    <div
      style={{
        width: '100vw',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 顶部内容：海报和右侧信息 */}
      <div
        style={{
          width: '100%',
          maxWidth: contentMaxWidth,
          display: 'flex',
          flexDirection: 'row',
          margin: 0,
          padding: 0,
        }}
      >
        {/* 左侧海报 */}
        <div
          style={{
            flex: '0 0 260px',
            background: '#111',
            height: '220px',
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <img
            src={posterUrl}
            alt="海报"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        {/* 右侧信息 */}
        <div
          style={{
            flex: 1,
            padding: '28px 32px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              color: '#ffffffff',
              fontWeight: 700,
              fontSize: 22,
              lineHeight: 1.3,
              marginBottom: 8,
            }}
          >
            {concert.name}
          </div>
          <div
            style={{
              color: '#ffe066',
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            {concert.startDate} {concert.startTime}
          </div>
          <div
            style={{
              color: '#bdbdbd',
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              📍
            </span>
            {concert.venue} {concert.city}
          </div>
        </div>
      </div>

      {/* 下方详情内容卡片 */}
      <div
        style={{
          background: '#f6f6f6',
          borderRadius: 0,
          width: '100%',
          maxWidth: contentMaxWidth,
          margin: 0,
          padding: '32px 0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <div>
          <div
            style={{
              color: '#222',
              fontSize: 26,
              fontWeight: 600,
              marginBottom: 18,
              textAlign: 'center',
            }}
          >
            活动内容
          </div>
          <div
            style={{
              color: '#222',
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            {concert.name}
          </div>
          <div
            style={{
              color: '#222',
              fontSize: 16,
              marginBottom: 6,
              textAlign: 'center',
            }}
          >
            日期：{concert.startDate}
          </div>
          <div
            style={{
              color: '#222',
              fontSize: 16,
              marginBottom: 6,
              textAlign: 'center',
            }}
          >
            演出时间：{concert.startTime}
          </div>
          <div
            style={{
              color: '#222',
              fontSize: 16,
              marginBottom: 6,
              textAlign: 'center',
            }}
          >
            地点：{concert.venue} {concert.city}
          </div>
          {concert.description && (
            <div
              style={{
                color: '#222',
                fontSize: 15,
                margin: '18px 0 8px',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {concert.description}
            </div>
          )}
          <div style={{ marginTop: 18, textAlign: 'center' }}>
            <img
              src={seatMapUrl}
              alt="座位图"
              style={{
                width: '100%',
                maxWidth: 400,
                borderRadius: 8,
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                margin: '0 auto',
              }}
            />
          </div>
        </div>
      </div>
      {/* 购票按钮 */}
      <div
        style={{
          width: '100%',
          maxWidth: contentMaxWidth,
          background: '#f6f6f6',
          padding: '32px 0 48px 0',
          textAlign: 'center',
        }}
      >
        <button
          style={{
            background: isAvailable ? '#e63946' : '#ccc',
            color: '#fff',
            fontSize: 20,
            padding: '16px 48px',
            border: 'none',
            borderRadius: 8,
            cursor: isAvailable ? 'pointer' : 'not-allowed',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            opacity: isAvailable ? 1 : 0.7,
          }}
          disabled={!isAvailable}
        >
          立即购票
        </button>
      </div>
    </div>
  );
}

export default ConcertDetail;
