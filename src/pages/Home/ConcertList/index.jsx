import { Card, Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useConcertListStore from '../../../store/concertListStore';
import Search from './Search';
import styles from './index.module.css';

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
        {concerts.map((c) => (
          <Card key={c.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img
                src={c.imgUrl}
                alt={c.name}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 18 }}>{c.name}</div>
                <div>
                  {c.startDate} {c.startTime ? `| ${c.startTime}` : ''} |{' '}
                  {c.city} | {c.venue}
                </div>
                {c.description && (
                  <div style={{ color: '#aaa', fontSize: 14 }}>
                    {c.description}
                  </div>
                )}
              </div>
              <Button
                type="primary"
                onClick={() => handleBuy(c.id)}
                style={{ height: 35 }}
              >
                购买门票
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConcertList;
