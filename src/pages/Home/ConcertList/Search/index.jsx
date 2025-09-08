import { Button, Input, DatePicker, Space } from 'antd';
import { useState } from 'react';

const Search = () => {
  const [search, setSearch] = useState('');
  const [dates, setDates] = useState([]);
  return (
    <Space style={{ marginBottom: 16, marginTop: 30, height: 40 }}>
      <Input
        placeholder="请输入城市"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 500, height: 50, fontSize: 18, fontWeight: 500 }}
      />
      <DatePicker.RangePicker
        value={dates}
        onChange={setDates}
        size="large"
        className="custom-range"
        style={{ width: 500 }}
      />
      <Button
        type="primary"
        style={{ height: 50, width: 100, fontSize: 18, fontWeight: 500 }}
      >
        搜索
      </Button>
    </Space>
  );
};

export default Search;
