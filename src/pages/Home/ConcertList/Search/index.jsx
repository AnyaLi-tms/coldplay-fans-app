import { Button, Select, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import styles from './index.module.css';
import useConcertListStore from '../../../../store/concertListStore';

const Search = () => {
  const [search, setSearch] = useState('');
  const [dates, setDates] = useState([]);
  const { cities, fetchCities, fetchConcerts } = useConcertListStore();

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleSearch = () => {
    const params = {};
    if (search) params.city = search;
    if (dates && dates.length === 2) {
      params.startDate = dates[0]?.format('YYYY-MM-DD');
      params.endDate = dates[1]?.format('YYYY-MM-DD');
    }
    fetchConcerts(params);
  };

  return (
    <div className={styles['search-row']}>
      <Select
        placeholder="请选择城市"
        value={search || undefined}
        onChange={setSearch}
        className={styles['search-select']}
        optionLabelProp="label"
        options={cities.map((city) => ({
          value: city,
          label: <span style={{ marginLeft: 8 }}>{city}</span>,
        }))}
        allowClear
        size="large"
      />
      <DatePicker.RangePicker
        placeholder={['开始日期', '结束日期']}
        value={dates && dates.length ? dates : undefined}
        onChange={setDates}
        size="large"
        className={`${styles['search-range']} custom-range`}
      />
      <Button
        type="primary"
        className={styles['search-btn']}
        onClick={handleSearch}
      >
        搜索
      </Button>
    </div>
  );
};

export default Search;
