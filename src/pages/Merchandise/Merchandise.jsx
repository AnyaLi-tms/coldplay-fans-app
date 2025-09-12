import React, { useEffect } from 'react';
import styles from './Merchandise.module.css';
import useMerchandiseStore from '../../store/merchandiseStore';
import { useNavigate } from 'react-router-dom';

function Merchandise() {
  const { merchandise, loading, fetchMerchandise } = useMerchandiseStore();
  const [searchVal, setSearchVal] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMerchandise();
  }, []);

  // 搜索功能实现
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMerchandise(searchVal);
  };
  // 计算分页数据
  const totalItems = merchandise ? merchandise.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagedMerchandise = merchandise
    ? merchandise.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : [];

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
        <>
          <div className={styles.grid}>
            {pagedMerchandise.map((item) => (
              <div
                className={styles.card}
                key={item.id}
                onClick={() => {
                  navigate('/merchandise/payment', {
                    state: {
                      type: item.type,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      imgUrl: item.imgUrl,
                    },
                  });
                }}
                style={{ cursor: 'pointer' }}
              >
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
          {/* 分页导航 */}
          {totalPages >= 1 && (
            <div
              style={{
                width: '100%',
                boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px 0',
                gap: 8,
                marginTop: 32,
              }}
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: '1px solid #ddd',
                  background: '#fff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                上一页
              </button>
              {/* 页码显示逻辑：第一页、最后一页、本页及本页前后页 */}
              {(() => {
                const pages = [];
                if (totalPages <= 1) {
                  pages.push(1);
                } else {
                  // always show first page
                  pages.push(1);
                  // show ... if currentPage > 3
                  if (currentPage > 3) pages.push('...');
                  // show previous page if not first/second
                  if (currentPage - 1 > 1) pages.push(currentPage - 1);
                  // show current page if not first/last
                  if (currentPage !== 1 && currentPage !== totalPages)
                    pages.push(currentPage);
                  // show next page if not last/second last
                  if (currentPage + 1 < totalPages) pages.push(currentPage + 1);
                  // show ... if currentPage < totalPages - 2
                  if (currentPage < totalPages - 2) pages.push('...');
                  // always show last page if more than one
                  if (totalPages > 1) pages.push(totalPages);
                }
                // 去重并排序
                const uniquePages = Array.from(new Set(pages)).filter(Boolean);
                return uniquePages.map((p, idx) =>
                  p === '...' ? (
                    <span
                      key={'ellipsis-' + idx}
                      style={{ color: '#fff', padding: '0 8px' }}
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: '1px solid #ddd',
                        background: currentPage === p ? '#ff4d4f' : '#fff',
                        color: currentPage === p ? '#fff' : '#222',
                        cursor: 'pointer',
                        fontWeight: currentPage === p ? 600 : 400,
                      }}
                    >
                      {p}
                    </button>
                  ),
                );
              })()}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: '1px solid #ddd',
                  background: '#fff',
                  cursor:
                    currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                下一页
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Merchandise;
