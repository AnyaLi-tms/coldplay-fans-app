import React, { useEffect } from 'react';
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

  function onChange(key) {
    console.log(`Tab changed to: ${key}`);
  }

  return (
    <div className={styles.userPage}>
      <h1>用户订单</h1>
      <Tabs
        onChange={onChange}
        type="card"
        size="large"
        items={[
          {
            label: '演唱会订单门票',
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
                    <p>暂无演唱会门票订单</p>
                  )}
                </ul>
              </section>
            ),
          },
          {
            label: '周边订单',
            key: '2',
            children: (
              <section>
                <ul>
                  {merchandiseOrders.map((order) => (
                    <li key={order.orderId} className={styles.orderItem}>
                      <img
                        src={order.imgUrl}
                        alt="Merchandise"
                        className={styles.orderImage}
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
                  ))}
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
