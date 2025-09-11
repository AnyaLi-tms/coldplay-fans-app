import React, { useEffect, useState } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { useTicketSelectStore } from '../../store/ticketSelectStore';
import styles from './Order.module.css';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import noOrder from '../../assets/noOrder.png';

function Order() {
  const [activeKey, setActiveKey] = useState('1');
  const { merchandiseOrders, loadMerchandiseOrders } = useOrderStore();
  const { ticketOrders, loadTicketOrders } = useTicketSelectStore();
  const navigate = useNavigate();
  function onChange(key) {
    setActiveKey(key);
  }
  useEffect(() => {
    // 检查token
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    loadTicketOrders();
    loadMerchandiseOrders();
  }, [loadTicketOrders, loadMerchandiseOrders, navigate]);

  return (
    <div className={styles.userPage}>
      <Tabs
        onChange={onChange}
        style={{ width: '67%', margin: '0 auto' }}
        activeKey={activeKey}
        type="card"
        size="large"
        items={[
          {
            label: (
              <span
                className={
                  activeKey === '1'
                    ? `${styles.customTab} ${styles.customTabActive}`
                    : styles.customTab
                }
              >
                演唱会门票订单
              </span>
            ),
            key: '1',
            children: (
              <section>
                {ticketOrders && ticketOrders.length > 0 ? (
                  <table className={styles.orderTable}>
                    <thead>
                      <tr>
                        <th>项目名称</th>
                        <th>票务详情</th>
                        <th>票品张数</th>
                        <th>订单金额</th>
                        <th>交易状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticketOrders.map((order) => (
                        <tr key={order.orderId} className={styles.orderRow}>
                          <td>
                            <div className={styles.orderCellMain}>
                              <img
                                src={order.concertImgUrl}
                                alt="Concert"
                                className={styles.orderImage}
                              />
                              <div>
                                <div className={styles.orderTitle}>
                                  {order.concertName}
                                </div>
                                <div className={styles.orderSubInfo}>
                                  订单号：{order.orderId}
                                </div>
                                <div className={styles.orderSubInfo}>
                                  购买日期：
                                  {new Date(
                                    order.purchaseDate,
                                  ).toLocaleString()}
                                </div>
                                <div className={styles.orderSubInfo}>
                                  演唱会日期：{order.concertDate}
                                </div>
                                <div className={styles.orderSubInfo}>
                                  演唱会时间：{order.concertTime}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {order.ticketOrderList &&
                            order.ticketOrderList.length > 0 ? (
                              <ul className={styles.ticketList}>
                                {order.ticketOrderList.map((ticket, idx) => (
                                  <li key={idx} className={styles.ticketItem}>
                                    座位号: {ticket.seatNumber} &nbsp; 身份证号:{' '}
                                    {ticket.idNumber}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                          <td>{order.amount}</td>
                          <td>￥{order.totalPrice.toFixed(2)}</td>
                          <td>
                            <div>{order.status}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.emptyOrder}>
                    <img src={noOrder} alt="No Orders" />
                    <h2>您暂时没有演唱会门票订单</h2>
                  </div>
                )}
              </section>
            ),
          },
          {
            label: (
              <span
                className={
                  activeKey === '2'
                    ? `${styles.customTab} ${styles.customTabActive}`
                    : styles.customTab
                }
              >
                周边订单
              </span>
            ),
            key: '2',
            children: (
              <section>
                {merchandiseOrders && merchandiseOrders.length > 0 ? (
                  <table className={styles.orderTable}>
                    <thead>
                      <tr>
                        <th>商品信息</th>
                        <th>商品数量</th>
                        <th>订单金额</th>
                        <th>交易状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {merchandiseOrders.map((order) => (
                        <tr key={order.orderId} className={styles.orderRow}>
                          <td>
                            <div className={styles.orderCellMain}>
                              <img
                                src={order.imgUrl}
                                alt="Merchandise"
                                className={styles.orderImage}
                              />
                              <div>
                                {order.merchandiseList &&
                                order.merchandiseList.length > 0 ? (
                                  <ul className={styles.ticketList}>
                                    {[
                                      ...new Map(
                                        order.merchandiseList.map((item) => [
                                          item.merchandiseName +
                                            item.merchandisePrice,
                                          item,
                                        ]),
                                      ).values(),
                                    ].map((item, idx) => (
                                      <li
                                        key={idx}
                                        className={styles.ticketItem}
                                      >
                                        {item.merchandiseName} - ¥
                                        {item.merchandisePrice.toFixed(2)}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div className={styles.orderTitle}>
                                    {order.merchandiseName}
                                  </div>
                                )}
                                <div className={styles.orderSubInfo}>
                                  下单时间：
                                  {new Date(
                                    order.purchaseDate,
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{order.amount}</td>
                          <td>￥{order.totalPrice.toFixed(2)}</td>
                          <td>
                            <div>{order.status}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.emptyOrder}>
                    <img src={noOrder} alt="No Orders" />
                    <h2>您暂时没有周边订单</h2>
                  </div>
                )}
              </section>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Order;
