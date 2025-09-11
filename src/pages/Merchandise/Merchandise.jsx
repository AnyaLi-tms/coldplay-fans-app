import React, { useEffect } from 'react';
import styles from './Merchandise.module.css';
import useMerchandiseStore from '../../store/merchandiseStore';

function Merchandise() {
  const { merchandise, loading, fetchMerchandise } = useMerchandiseStore();
  const [searchVal, setSearchVal] = React.useState('');

  useEffect(() => {
    fetchMerchandise();
  }, []);

  // 搜索功能实现
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMerchandise(searchVal);
  };
  return (
    <div className={styles.merchPage}>
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          placeholder="搜索商品名称..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className={styles.searchBtn} type="submit">
          搜索
        </button>
      </form>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>
          加载中...
        </div>
      ) : (
        <div className={styles.grid}>
          {(merchandise || []).map((item) => (
            <div className={styles.card} key={item.id}>
              <img className={styles.img} src={item.imgUrl} alt={item.name} />
              <div className={styles.name}>{item.name}</div>
              <div className={styles.price}>￥{item.price}</div>
              {item.description && (
                <div
                  className={styles.desc}
                  style={{ color: '#888', fontSize: 13, marginTop: 4 }}
                >
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Merchandise;
