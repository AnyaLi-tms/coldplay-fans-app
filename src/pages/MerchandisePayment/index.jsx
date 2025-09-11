import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import alipayIcon from '../../assets/alipay.svg';
import styles from './index.module.css';
import PopUp from '../Payment/components/Popup';
import {
  getStocks,
  submitMerchandisePayment,
} from '../../services/merchandisePayment'
const MerchandisePayment = () => {
  const location = useLocation();
  const { type, name, description, price,imgUrl } = location.state || {};
  const [merchandiseInfo, setMerchandiseInfo] = useState({
    type: '',
    name: '',
    description: '', 
    price: 0,
    stock: 0,
    imageUrl: '',
  });
  const [count, setCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [popup, setPopup] = useState({ visible: false, status: 'paying' });
  const discount = 0.2 * merchandiseInfo.price; // 20% 折扣
  const transformPrice = 5;
  const navigate = useNavigate();
const getStockByName = async (name) => {
    const response = await getStocks();
    if (response.status === 200) {
      const stockData = response.data;
      const item = stockData[name];
      if (item) {
        setMerchandiseInfo((prev) => ({ ...prev, stock: item }));
      } else {
        setPopup({ visible: true, status: '', msg: '未找到该商品的库存信息' });
      }
    } else {
      setPopup({ visible: true, status: 'error', msg: '获取商品库存失败' });
    }
  }
  // 检查收件信息是否为空
  const checkInfo = () => recipient.trim() !== '' && phone.trim() !== '' && address.trim() !== '';
  // 检查本地token
  const checkLogin = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  };
  //检查手机号格式
  const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const updateAmount = (e) => {
    const value = e.target.innerText;
    if (value === '+') {
      setCount(count + 1);
    } else {
      setCount(count > 1 ? count - 1 : 1);
    }
  }; 
  useEffect(() => {
    setMerchandiseInfo((prev) => ({
      ...prev,
      name: name,
      description: description,
      price: price,
      imageUrl: imgUrl,
      type: type,
    }));
    getStockByName(merchandiseInfo.name);
    checkLogin();
  }, []);

  // 关闭弹窗时根据支付结果跳转
  const handlePopupClose = () => {
    setPopup({ visible: false, status: '', msg: '' });
    if (popup.status === 'success') {
      navigate('/');
    } else if (popup.status === 'error') {
      navigate('/merchandise');
    }
  };

  const handlePay = async () => {
    if (!checkInfo()) {
      setPopup({ visible: true, status: '', msg: '请填写完整的收件信息' });
      return;
    }
    if (!validatePhone(phone)) {
      setPopup({
        visible: true,
        status: '',
        msg: '请检查手机号是否正确',
      });
      return;
    }

    setPopup({ visible: true, status: 'paying', msg: '正在支付中，请稍后...' });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const result = await submitMerchandisePayment({
      type: merchandiseInfo.type,
      address: address,
      quantity: count,
    });
    if (result.status === 200) {
      setPopup({
        visible: true,
        status: 'success',
        msg: result.data.msg || '支付成功！',
      });
    } else {
      setPopup({
        visible: true,
        status: 'error',
        msg: result.data.msg || '支付失败',
      });
    }
  };

  return (
    <div className={styles['payment-container']}>
      <div className={styles['concert-section']}>
        <div className={styles['concert-title']}>{merchandiseInfo.name}</div>
        <div className={styles['merchandise-row']}>
          <div className={styles['concert-subtitle']}>
            {merchandiseInfo.description}
          </div>
          <div className={styles['merchandise-image-container']}>
            <img
              src={merchandiseInfo.imageUrl}
              alt={merchandiseInfo.name}
              className={styles['merchandise-image']}
            />
          </div>
        </div>

        <div className={styles['ticket-info']}>￥{merchandiseInfo.price}</div>
        <div></div>
      </div>
      <div className={styles['content-container']}>
        <div className={styles['logistics-section']}>
          <div className={styles['logi</div>stics-title']}>物流信息</div>
          <div className={styles['logistics-content']}>
            由顺丰快递配送，支持全程物流跟踪。
          </div>
        </div>
        <div className={styles['custom-section']}>
          <div className={styles['address-header']}>
            <span className={styles['address-label']}>收件人信息</span>
            <span className={styles['address-type']}>送货上门</span>
            <span className={styles['delivery-time']}>
              预计发货时间：24小时内
            </span>
          </div>
          <div className={styles['address-info-row']}>
            <input
              className={styles['address-input']}
              type="text"
              placeholder="收货人姓名"
              onChange={(e) => setRecipient(e.target.value.trim())}
              style={{ marginRight: 12, width: 120 }}
            />
            <input
              className={styles['address-input']}
              type="text"
              placeholder="手机号"
              onChange={(e) => setPhone(e.target.value.trim())}
              style={{ marginRight: 12, width: 140 }}
            />
            <input
              className={styles['address-input']}
              type="text"
              placeholder="详细地址"
              onChange={(e) => setAddress(e.target.value.trim())}
              style={{ flex: 1 }}
            />
          </div>
        </div>
        <div className={styles['amount-section']}>
          <div className={styles['delivery-title']}>支付信息</div>
          <span className={styles['amount-selector']}>
            <button
              className={styles['amount-btn']}
              onClick={updateAmount}
              disabled={count <= 1}
            >
              -
            </button>
            <span className={styles['amount-value']}>{count}</span>
            <button
              className={styles['amount-btn']}
              onClick={updateAmount}
              disabled={count >= merchandiseInfo.stock}
            >
              +
            </button>
          </span>
          <div className={styles['summary-row']}>
            <span>商品金额</span>
            <span>￥{merchandiseInfo.price * count}</span>
          </div>
          <div className={styles['summary-row']}>
            <span>运费</span>
            <span>￥{transformPrice.toFixed(2)}</span>
          </div>
          <div className={styles['summary-row']}>
            <span>优惠</span>
            <span style={{ color: '#f00' }}>-￥{discount.toFixed(2)}</span>
          </div>
          <div className={styles['summary-row']}>
            <span>合计</span>
            <span style={{ fontWeight: 'bold', color: '#d7000f' }}>
              ￥{merchandiseInfo.price * count + transformPrice - discount}
            </span>
          </div>
        </div>
        <div className={styles['delivery-section']}>
          <div>
            <div>
              <span className={styles['delivery-label']}>发票</span>
              <span className={styles['delivery-chunk']}>电子发票</span>
            </div>
            <span className={styles['delivery-value']}>
              支付成功后，前往我的订单查看
            </span>
          </div>
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
          ￥{merchandiseInfo.price * count + transformPrice - discount}
        </div>
        <button
          className={`${styles['pay-btn']} ${
            !checkInfo() ? styles['pay-btn-disabled'] : ''
          }`}
          onClick={handlePay}
          disabled={!checkInfo()}
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
export default MerchandisePayment;
