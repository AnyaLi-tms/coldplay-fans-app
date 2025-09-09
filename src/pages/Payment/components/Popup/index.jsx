import React from 'react';
import styles from './index.module.css';

export default function PopUp({ visible, status, msg, onClose }) {
  if (!visible) return null;
  let content = null;
  if (status === 'paying') {
    content = (
      <div className={styles['popup-text']}>{msg || '正在支付...'}</div>
    );
  } else if (status === 'success') {
    content = <div className={styles['popup-text']}>{msg || '支付成功'}</div>;
  } else if (status === 'error') {
    content = <div className={styles['popup-text']}>{msg || '支付失败'}</div>;
  } else {
    content = <div className={styles['popup-text']}>{msg}</div>;
  }
  return (
    <div className={styles['popup-mask']}>
      <div className={styles['popup-content']}>
        {content}
        {(status === 'success' || status === 'error' || status === '') && (
          <button className={styles['popup-close']} onClick={onClose}>
            关闭
          </button>
        )}
      </div>
    </div>
  );
}
