import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTicketSelectStore } from '../../store/ticketSelectStore';
import styles from './TicketSelect.module.css';

function TicketSelect() {
  const { id } = useParams();
  const {
    sessions,
    tickets,
    selectedSessionId,
    selectSession,
    fetchTicketData,
    selectTicket,
    selectedTicketId,
  } = useTicketSelectStore();

  useEffect(() => {
    fetchTicketData(id);
  }, [id, fetchTicketData]);

  return (
    <div className={styles.container}>
      {/* 场次选择 */}
      <div className={styles.sectionTitle}>
        场次 <span className={styles.sectionTip}>场次时间均为演出当地时间</span>
      </div>
      <div className={styles.sessionList}>
        {sessions.map((session) => (
          <div
            key={session.id}
            className={
              session.id === selectedSessionId
                ? styles.sessionActive
                : styles.session
            }
            onClick={() => selectSession(session.id)}
          >
            <span className={styles.sessionDate}>
              {session.date} {session.weekday} {session.time}
            </span>
            {session.discount && (
              <span className={styles.discountTag}>{session.discount}</span>
            )}
          </div>
        ))}
      </div>
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
            <div className={styles.ticketPrice}>{ticket.price}</div>
            {ticket.soldOut && (
              <div className={styles.soldOutTag}>缺货登记</div>
            )}
            {ticket.discount && (
              <span className={styles.discountTag}>{ticket.discount}</span>
            )}
            {ticket.finalPrice && (
              <div className={styles.finalPrice}>到手{ticket.finalPrice}元</div>
            )}
          </div>
        ))}
      </div>
      {/* 去购票按钮 */}
      <div className={styles.btnArea}>
        <button className={styles.btn} disabled={!selectedTicketId}>
          去购票
        </button>
      </div>
    </div>
  );
}

export default TicketSelect;
