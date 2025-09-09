import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import alipayIcon from '../../assets/alipay.svg';
import styles from './index.module.css';
import PopUp from './components/Popup';
import validateIdCard from './utils/validateIdCard';
import { useConcertDetailStore } from '../../store/concertDetailStore';

import { usePaymentStore } from '../../store/paymentStore';
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { concertId, ticketId, area, price, quantity } = location.state || {};

  const { concert } = useConcertDetailStore();
  const [ids, setIds] = useState(Array(quantity).fill(''));
  const [idErrors, setIdErrors] = useState(Array(quantity).fill(false));
  const [popup, setPopup] = useState({ visible: false, status: 'paying' });

  const total = quantity * (price || 0);
  const { fetchBuyTicket } = usePaymentStore();

  // 关闭弹窗时根据支付结果跳转
  const handlePopupClose = () => {
    setPopup({ visible: false, status: '', msg: '' });
    if (popup.status === 'success') {
      navigate('/');
    } else if (popup.status === 'error') {
      navigate(`/ticket/prices/${concertId}`);
    }
  };

  const handlePay = async () => {
    if (idErrors.some(Boolean)) return;
    if (ids.some((id) => !id)) {
      setPopup({
        visible: true,
        status: '',
        msg: '请检查身份证号是否正确或重复',
      });
      setIdErrors(ids.map((id) => !id || !validateIdCard(id)));
      return;
    }
    const hasDuplicate = new Set(ids).size !== ids.length;
    if (hasDuplicate) {
      setPopup({
        visible: true,
        status: '',
        msg: '请检查身份证号是否正确或重复',
      });
      return;
    }

    setPopup({ visible: true, status: 'paying', msg: '正在支付中，请稍后...' });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const result = await fetchBuyTicket(concertId, {
      idNums: ids,
      seatArea: area,
    });
    if (result.status === 'true') {
      setPopup({
        visible: true,
        status: 'success',
        msg: result.msg || '支付成功！',
      });
    } else {
      setPopup({
        visible: true,
        status: 'error',
        msg: result.msg || '支付失败',
      });
    }
  };

  // 输入身份证
  const handleIdChange = (i, val) => {
    const arr = [...ids];
    arr[i] = val;
    setIds(arr);
    // 实时校验
    const errArr = [...idErrors];
    errArr[i] = val && !validateIdCard(val);
    setIdErrors(errArr);
  };

  return (
    <div className={styles['payment-container']}>
      <div className={styles['concert-section']}>
        <div className={styles['concert-title']}>{concert.name}</div>
        <div className={styles['concert-location']}>
          {concert.city} | {concert.venue}
        </div>
        <div className={styles['concert-time']}>
          {concert.startDate + ' ' + concert.startTime}
        </div>
        <div className={styles['ticket-info']}>
          ￥{price} 票档 × {quantity}张
        </div>
      </div>
      <div className={styles['content-container']}>
        <div className={styles['delivery-section']}>
          <div className={styles['delivery-title']}>配送信息</div>
          <div>
            <div>
              <span className={styles['delivery-label']}>电子票</span>
              <span className={styles['delivery-chunk']}>实名制观演</span>
            </div>
            <span className={styles['delivery-value']}>
              支付成功后，无需取票，前往我的查看订单
            </span>
          </div>
        </div>

        <div className={styles['id-section']}>
          <div className={styles['id-title']}>实名观演人</div>
          {Array(quantity)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={styles['id-input-row']}>
                <input
                  className={styles['id-input']}
                  placeholder={`请输入第${i + 1}位身份证号`}
                  value={ids[i]}
                  onChange={(e) => handleIdChange(i, e.target.value.trim())}
                  maxLength={18}
                />
                {idErrors[i] && (
                  <span className={styles['id-error']}>身份证格式有误</span>
                )}
              </div>
            ))}
        </div>

        {/* 支付方式 */}
        <div className={styles['payment-method']}>
          <div className={styles['method-title']}>支付方式</div>
          <div className={styles['method-row']}>
            <div className={styles['method-icon-container']}>
              <img
                src={alipayIcon}
                alt="alipay"
                className={styles['method-icon']}
              />
              <span className={styles['method-label']}>支付宝</span>
            </div>
            <input
              type="checkbox"
              checked
              readOnly
              className={styles['method-checkbox']}
            />
          </div>
        </div>
      </div>

      <div className={styles['payment-footer']}>
        <div className={styles['total']}>
          <span
            style={{
              fontWeight: 'normal',
              fontSize: '14px',
              color: '#000',
              marginRight: '4px',
            }}
          >
            总价:
          </span>
          ￥{total}
        </div>
        <button
          className={`${styles['pay-btn']} ${
            ids.some((id) => !id) || idErrors.some(Boolean)
              ? styles['pay-btn-disabled']
              : ''
          }`}
          onClick={handlePay}
          disabled={ids.some((id) => !id) || idErrors.some(Boolean)}
        >
          支付
        </button>
      </div>

      <PopUp
        visible={popup.visible}
        status={popup.status}
        msg={popup.msg}
        onClose={handlePopupClose}
      />
    </div>
  );
};
export default Payment;
