import { Card, Button, Input, DatePicker, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const concerts = [
  {
    id: 1,
    date: '2025-10-01',
    img: 'https://p1.music.126.net/xxx/concert1.jpg',
    name: 'Coldplay 世界巡演',
    city: '上海',
    place: '梅赛德斯奔驰文化中心',
  },
  {
    id: 2,
    date: '2025-11-15',
    img: 'https://p1.music.126.net/xxx/concert2.jpg',
    name: 'Coldplay 亚洲巡演',
    city: '北京',
    place: '国家体育场',
  },
];

const ConcertList = () => {
  const [search, setSearch] = useState('');
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  const filtered = concerts.filter((c) => {
    const matchName = c.name.includes(search);
    const matchDate =
      !dates.length ||
      (c.date >= dates[0]?.format('YYYY-MM-DD') &&
        c.date <= dates[1]?.format('YYYY-MM-DD'));
    return matchName && matchDate;
  });

  const handleBuy = (id) => {
    navigate(`/concertdetail/${id}`);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="演唱会名称"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 180 }}
        />
        <DatePicker.RangePicker value={dates} onChange={setDates} />
        <Button type="primary">搜索</Button>
      </Space>
      <div>
        {filtered.map((c) => (
          <Card
            key={c.id}
            style={{ marginBottom: 16 }}
            bodyStyle={{ display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <img
              src={c.img}
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
                {c.date} | {c.city} | {c.place}
              </div>
            </div>
            <Button type="primary" onClick={() => handleBuy(c.id)}>
              购买门票
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConcertList;
