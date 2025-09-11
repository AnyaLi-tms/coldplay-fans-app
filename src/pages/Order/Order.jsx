import React, { useEffect, useState } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { useTicketSelectStore } from '../../store/ticketSelectStore';
import styles from './Order.module.css';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';

function Order() {
  const { merchandiseOrders, loadMerchandiseOrders } = useOrderStore();
  const { ticketOrders, loadTicketOrders } = useTicketSelectStore();
  const navigate = useNavigate();

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

  const [activeKey, setActiveKey] = useState('1');
  function onChange(key) {
    setActiveKey(key);
  }

  return (
    <div className={styles.userPage}>
      <h1>用户订单</h1>
      <Tabs
        onChange={onChange}
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
                <ul>
                  {ticketOrders && ticketOrders.length > 0 ? (
                    ticketOrders.map((order) => (
                      <li key={order.orderId} className={styles.orderItem}>
                        <img
                          src={order.concertImgUrl}
                          alt="Concert"
                          className={styles.orderImage}
                        />
                        <div className={styles.orderDetails}>
                          <p>订单号: {order.orderId}</p>
                          <p>演唱会名称: {order.concertName}</p>
                          <p>数量: {order.amount}</p>
                          <p>总价: ¥{order.totalPrice.toFixed(2)}</p>
                          <p>
                            购买日期:{' '}
                            {new Date(order.purchaseDate).toLocaleString()}
                          </p>
                          <p>演唱会日期: {order.concertDate}</p>
                          <p>演唱会时间: {order.concertTime}</p>
                          <p>状态: {order.status}</p>
                          <h4>票务详情:</h4>
                          <ul>
                            {order.ticketOrderList.map((ticket, index) => (
                              <li key={index}>
                                座位号: {ticket.seatNumber}, 身份证号:{' '}
                                {ticket.idNumber}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className={styles.emptyOrder}>
                      <img src="src/assets/noOrder.png" alt="No Orders" />
                      <h2>您暂时没有演唱会门票订单</h2>
                    </div>
                  )}
                </ul>
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
                <ul>
                  {merchandiseOrders && merchandiseOrders.length > 0 ? (
                    merchandiseOrders.map((order) => (
                      <li key={order.orderId} className={styles.orderItem}>
                        <img
                          src={order.imgUrl}
                          alt="Merchandise"
                          className={styles.orderImage}
                          style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover',
                          }}
                        />
                        <div className={styles.orderDetails}>
                          <p>订单号: {order.orderId}</p>
                          <p>数量: {order.amount}</p>
                          <p>总价: ¥{order.totalPrice.toFixed(2)}</p>
                          <p>
                            购买日期:{' '}
                            {new Date(order.purchaseDate).toLocaleString()}
                          </p>
                          <p>状态: {order.status}</p>
                          <h4>商品列表:</h4>
                          <ul>
                            {order.merchandiseList.map((item) => (
                              <li key={item.merchandiseId}>
                                {item.merchandiseName} - ¥
                                {item.merchandisePrice.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className={styles.emptyOrder}>
                      <img src="src/assets/noOrder.png" alt="No Orders" />
                      <h2>您暂时没有周边订单</h2>
                    </div>
                  )}
                </ul>
              </section>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Order;
