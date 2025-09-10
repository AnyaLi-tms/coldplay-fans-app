import React, { useEffect, useState } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { useMerchandiseStore } from '../../store/merchandiseStore';
import { useTicketSelectStore } from '../../store/ticketSelectStore';
import styles from './Order.module.css';
import { useNavigate } from 'react-router-dom';

function Order() {
  const { fetchOrders } = useOrderStore();
  const { merchandiseOrders, loadMerchandiseOrders } = useMerchandiseStore();
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

  return (
    <div className={styles.userPage}>
      <h1>用户订单</h1>
      <section>
        <h2>演唱会门票订单</h2>
        <ul>
          {ticketOrders.map((order) => (
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
                <p>购买日期: {new Date(order.purchaseDate).toLocaleString()}</p>
                <p>状态: {order.status}</p>
                <h4>票务详情:</h4>
                <ul>
                  {order.ticketOrderList.map((ticket, index) => (
                    <li key={index}>
                      座位号: {ticket.seatNumber}, 身份证号: {ticket.idNumber}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>周边商品订单</h2>
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
                <p>购买日期: {new Date(order.purchaseDate).toLocaleString()}</p>
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
    </div>
  );
}

export default Order;
