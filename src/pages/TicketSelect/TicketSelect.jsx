import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTicketSelectStore } from '../../store/ticketSelectStore';
import { useConcertDetailStore } from '../../store/concertDetailStore';
import styles from './TicketSelect.module.css';

function TicketSelect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, fetchTicketData, selectTicket, selectedTicketId } =
    useTicketSelectStore();
  const { concert, fetchDetail } = useConcertDetailStore();
  const [quantity, setQuantity] = useState(1);

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
    <div className={styles.container}>
      {/* 场次选择 */}
      <div className={styles.sectionTitle}>
        场次 <span className={styles.sectionTip}>场次时间均为演出当地时间</span>
      </div>
      {concert && (
        <div className={styles.concertTimeInfo}>
          日期：{concert.startDate} &nbsp; 演出时间：{concert.startTime}
        </div>
      )}

      {/* 票档选择 */}
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
                <span className={styles.seatArea}>（{ticket.seatArea}）</span>
              )}
            </div>
            {ticket.soldOut && (
              <div className={styles.soldOutTag}>缺货登记</div>
            )}
          </div>
        ))}
      </div>
      {/* 购票数量选择器和去购票按钮 */}
      <div className={styles.btnArea}>
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
        <button className={styles.btn} disabled={!selectedTicketId}>
          去购票
        </button>
      </div>
    </div>
  );
}

export default TicketSelect;
