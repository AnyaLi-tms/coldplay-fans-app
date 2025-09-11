import api from './api';
// 获取场次列表
export async function fetchSessions(concertId) {
  const res = await api.get(`/concerts/${concertId}`);
  return res.data.sessions || [];
}

// 获取票档列表，并返回concertId
export async function fetchTicketPrices(concertId) {
  const res = await api.get(`/ticket/prices/${concertId}`);
  return {
    priceList: (res.data.priceList || []).map((item, idx) => ({
      ...item,
      soldOut: typeof item.remainNumber === 'number' && item.remainNumber <= 0,
      id: `t${idx + 1}`,
    })),
    seatMapUrl: res.data.seatMapUrl,
    posterUrl: res.data.posterUrl,
    concertId: res.data.concertId || concertId,
  };
}

// 获取用户的票务订单
export const loadTicketOrders = () =>
  api.get('/ticket/myTicket').then((res) => res.data);
