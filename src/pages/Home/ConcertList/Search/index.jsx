import { Button, Input, DatePicker, Space } from 'antd';
import { useState } from 'react';

const Search = () => {
  const [search, setSearch] = useState('');
  const [dates, setDates] = useState([]);
  return (
    <div
      style={{
        marginBottom: 16,
        marginTop: 30,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
      }}
      size="large"
    >
      <Input
        placeholder="请输入城市"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 1.3,
          minWidth: 0,
          height: 50,
          fontSize: 18,
          fontWeight: 500,
        }}
      />
      <DatePicker.RangePicker
        value={dates}
        onChange={setDates}
        size="large"
        className="custom-range"
        style={{ flex: 1.3, minWidth: 0 }}
      />
      <Button
        type="primary"
        style={{
          flex: 0.3,
          minWidth: 80,
          height: 50,
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        搜索
      </Button>
    </div>
  );
};

export default Search;
