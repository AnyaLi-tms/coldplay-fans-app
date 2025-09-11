import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTicketSelectStore } from '../../store/ticketSelectStore';
import { useConcertDetailStore } from '../../store/concertDetailStore';
import styles from './TicketSelect.module.css';
import Quiz from './Quiz';
import { useQuizStore } from '../../store/quizStore';
import { useRef } from 'react';

function TicketSelect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, fetchTicketData, selectTicket, selectedTicketId } =
    useTicketSelectStore();
  const { concert, fetchDetail } = useConcertDetailStore();
  const [quantity, setQuantity] = useState(1);
  const seatMapUrl = concert.seatMapUrl;
  // 答题store
  const {
    quizList,
    quizValues,
    quizLoading,
    quizWarning,
    quizVisible,
    setQuizValue,
    setQuizWarning,
    setQuizVisible,
    loadQuiz,
    resetQuiz,
    checkAnswers,
  } = useQuizStore();
  const [quizErrorModal, setQuizErrorModal] = useState(false);
  const quizErrorTimer = useRef();

  const handleSubmit = async () => {
    await loadQuiz();
    setQuizVisible(true);
    setQuizWarning('');
    resetQuiz();
  };
  const handleQuizChange = (idx, val) => {
    setQuizValue(idx, val);
    setQuizWarning('');
  };
  const handleQuizSubmit = async () => {
    // 检查是否全部答完
    if (quizValues.length !== quizList.length || quizValues.some((v) => !v)) {
      setQuizWarning('请完成所有题目再提交');
      return;
    }
    // 后端校验答案
    const res = await checkAnswers();
    if (!res) {
      setQuizErrorModal(true);
      quizErrorTimer.current = setTimeout(() => {
        setQuizErrorModal(false);
      }, 3000);
      return;
    }
    setQuizVisible(false);
    // 获取选中的票档信息
    const selectedTicket = tickets.find((t) => t.id === selectedTicketId);
    navigate('/ticket/payment', {
      state: {
        concertId: id,
        area: selectedTicket?.seatArea,
        price: selectedTicket?.price,
        quantity,
      },
    });
  };
  const handleQuizClose = () => {
    setQuizVisible(false);
    setQuizWarning('');
    setQuizErrorModal(false);
    if (quizErrorTimer.current) clearTimeout(quizErrorTimer.current);
  };
  const contentMaxWidth = 1200;
  useEffect(() => {
    // 检查token
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetchTicketData(id);
    fetchDetail(id);
  }, [id, fetchTicketData, fetchDetail, navigate]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.flexRow}>
          {/* 左侧：购票须知 */}
          <div className={styles.noticeColumn}>
            <div className={styles.noticeCard}>
              <div className={styles.noticeTitle}>购票须知</div>
              <ul className={styles.noticeList}>
                <li>每个账号最多购买4张。</li>
                <li>演唱会开始前三十日开放购票。</li>
                <li>
                  本项目支持实名制购票及入场，购票完成后观演人信息不可更改，须携带身份证等有效证件入场。
                </li>
                <li>入场后为站席观演，门票无对应座位。</li>
                <li>如需发票请在购票后1个月内申请，逾期不予受理。</li>
                <li>如遇不可抗力导致演出取消，将按主办方政策退票。</li>
              </ul>
            </div>
          </div>
          {/* 右侧：三个卡片 */}
          <div className={styles.cardsColumn}>
            {/* 顶部：演唱会信息卡片 */}
            <div
              className={styles.topCard}
              style={{ maxWidth: contentMaxWidth }}
            >
              <div className={styles.poster}>
                {concert.imgUrl && (
                  <img
                    src={concert.imgUrl}
                    alt="海报"
                    className={styles.posterImg}
                  />
                )}
              </div>
              <div className={styles.info}>
                <div className={styles.title}>{concert.name}</div>
                <div className={styles.time}>
                  {concert.startDate} {concert.startTime}
                </div>
                <div className={styles.location}>
                  <span>📍</span>
                  {concert.venue} {concert.city}
                </div>
              </div>
            </div>
            {/* 中部：场次和票档卡片 */}
            <div
              className={styles.middleCard}
              style={{ maxWidth: contentMaxWidth }}
            >
              <div className={styles.sectionTitle}>
                场次{' '}
                <span className={styles.sectionTip}>
                  场次时间均为演出当地时间
                </span>
              </div>
              {concert && (
                <div className={styles.concertTimeInfo}>
                  日期：{concert.startDate} &nbsp; 演出时间：{concert.startTime}
                </div>
              )}
              <div className={styles.sectionTitle}>票档</div>
              <div className={styles.ticketList}>
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={
                      ticket.soldOut
                        ? styles.ticketSoldOut
                        : ticket.id === selectedTicketId
                          ? styles.ticketActive
                          : styles.ticket
                    }
                    onClick={() => !ticket.soldOut && selectTicket(ticket.id)}
                  >
                    <div className={styles.ticketPrice}>
                      {ticket.price}
                      {ticket.seatArea && (
                        <span className={styles.seatArea}>
                          （{ticket.seatArea}）
                        </span>
                      )}
                    </div>
                    {ticket.soldOut && (
                      <div className={styles.soldOutTag}>缺货登记</div>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.seatmap}>
                <img
                  src={seatMapUrl}
                  alt="座位图"
                  className={styles.seatmapImg}
                />
              </div>
            </div>
            {/* 底部：购票按钮和数量卡片 */}
            <div
              className={styles.bottomCard}
              style={{ maxWidth: contentMaxWidth }}
            >
              <div className={styles.quantityArea}>
                <span>购票数量：</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className={styles.qtyNum}>{quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity((q) => Math.min(4, q + 1))}
                  disabled={quantity >= 4}
                >
                  +
                </button>
                <span className={styles.qtyTip}>（单人限购4张）</span>
              </div>
              <button
                className={styles.btn}
                disabled={!selectedTicketId}
                onClick={handleSubmit}
              >
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 答题弹窗 */}
      <Quiz
        visible={quizVisible}
        quizList={quizList}
        quizValues={quizValues}
        onChange={handleQuizChange}
        onSubmit={handleQuizSubmit}
        onClose={handleQuizClose}
        warning={quizWarning}
        loading={quizLoading}
      />
      {/* 答案错误弹窗 */}
      {quizErrorModal && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.15)',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '32px 48px',
              fontSize: 18,
              color: '#d4380d',
              fontWeight: 600,
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            }}
          >
            答案有误，请重新作答
          </div>
        </div>
      )}
    </>
  );
}

export default TicketSelect;
