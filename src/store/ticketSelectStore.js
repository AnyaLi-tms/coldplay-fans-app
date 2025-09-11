import { create } from 'zustand';
import {
  fetchTicketPrices,
  fetchSessions,
  loadTicketOrders,
} from '../services/ticketselect';
import { fetchConcertDetail } from '../services/concertdetail';

export const useTicketSelectStore = create((set, get) => ({
  ticketOrders: [],
  tickets: [],
  selectedTicketId: null,
  selectSession: (sessionId) => {
    set({ selectedSessionId: sessionId, selectedTicketId: null });
  },

  fetchTicketData: async (id) => {
    // 先从/ticket/prices获取concertId
    const ticketData = await fetchTicketPrices(id);
    const concertId = ticketData.concertId;
    // 再用concertId获取场次详情
    const concert = await fetchConcertDetail(concertId);
    // 默认选中第一个场次
    const selectedSessionId = concert.length > 0 ? concert[0].id : null;
    set({
      concert,
      selectedSessionId,
      tickets: ticketData.priceList || [],
      seatMapUrl: concert.seatMapUrl,
      imgUrl: concert.imgUrl,
      selectedTicketId: null,
    });
  },

  selectTicket: (ticketId) => {
    set({ selectedTicketId: ticketId });
  },

  loadTicketOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await loadTicketOrders();
      set({ ticketOrders: res, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));
