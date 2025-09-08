import { useParams } from 'react-router-dom';
import posterImg from '../../img/poster.png';
import seatImg from '../../img/seatmap.png';

function ConcertDetail() {
  const { id } = useParams();
  // mock 数据，可根据 id 渲染不同内容
  const concert = {
    posterUrl: posterImg,
    title: 'PARK BO GUM 2025 FAN MEETING TOUR [BE WITH YOU] IN MACAO',
    time: '2025年9月6日 (星期六)',
    venue: '伦敦人综艺馆',
    location: '澳门伦敦人综艺馆',
    seatMapUrl: seatImg,
    id,
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: 180,
        margin: 0,
        padding: 0,
        background: '#222',
        display: 'flex',
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
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
          src={concert.posterUrl}
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
            fontWeight: 700,
            fontSize: 22,
            lineHeight: 1.3,
            marginBottom: 8,
          }}
        >
          {concert.title}
        </div>
        <div
          style={{
            color: '#ffe066',
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          {concert.time}
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
          {concert.venue}
        </div>
      </div>
    </div>
  );
}

export default ConcertDetail;
