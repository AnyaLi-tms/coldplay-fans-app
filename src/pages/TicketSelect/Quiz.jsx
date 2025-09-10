import React from 'react';
import styles from './Quiz.module.css';

const QuizModal = ({
  visible,
  quizList,
  quizValues,
  onChange,
  onSubmit,
  onClose,
  warning,
}) => {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <div className={styles.header}>
          <span className={styles.title}>答题页</span>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        {warning && <div className={styles.warning}>{warning}</div>}
        <div style={{ maxHeight: '55vh', overflowY: 'auto', marginTop: 8 }}>
          {quizList.map((q, idx) => (
            <div
              key={idx}
              className={styles.questionBlock}
              style={{ marginBottom: 12 }}
            >
              <div
                className={styles.questionText}
              >{`Q${idx + 1}. ${q.question}`}</div>
              <div className={styles.optionsBlock}>
                {q.options.map((opt, oidx) => (
                  <div
                    key={opt.value}
                    className={
                      quizValues[idx] === opt.value
                        ? styles.optionActive
                        : styles.option
                    }
                    onClick={() => onChange(idx, opt.value)}
                  >
                    <span className={styles.optionLabel}>
                      {String.fromCharCode(65 + oidx)}
                    </span>
                    <span className={styles.optionText}>{opt.label}</span>
                    {quizValues[idx] === opt.value && (
                      <span className={styles.check}>✔</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className={styles.submitBtn}
          style={{ width: 'calc(100% - 48px)', margin: '18px 24px 0 24px' }}
          onClick={onSubmit}
        >
          提交
        </button>
      </div>
    </div>
  );
};

export default QuizModal;
