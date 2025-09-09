import React from 'react';
import styles from './index.module.css';

export default function PopUp({ visible, status, onClose }) {
  if (!visible) return null;
  return (
    <div className={styles['popup-mask']}>
      <div className={styles['popup-content']}>
        {status === 'paying' ? (
          <div className={styles['popup-text']}>正在支付...</div>
        ) : (
          <div className={styles['popup-text']}>支付成功</div>
        )}
        {status === 'success' && (
          <button className={styles['popup-close']} onClick={onClose}>
            关闭
          </button>
        )}
      </div>
    </div>
  );
}
