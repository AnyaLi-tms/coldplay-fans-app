import { create } from 'zustand';
import { fetchTicketPrices, fetchSessions } from '../services/ticketselect';

export const useTicketSelectStore = create((set, get) => ({
  tickets: [],
  selectedTicketId: null,
  selectSession: (sessionId) => {
    set({ selectedSessionId: sessionId, selectedTicketId: null });
  },

  fetchTicketData: async (concertId) => {
    // 获取场次
    let sessions = await fetchSessions(concertId);
    if (!Array.isArray(sessions) || sessions.length === 0) {
      sessions = [];
    }
    // 默认选中第一个场次
    const selectedSessionId = sessions.length > 0 ? sessions[0].id : null;
    // 获取票档
    let tickets = await fetchTicketPrices(concertId);
    if (!Array.isArray(tickets) || tickets.length === 0) {
      tickets = [];
    }
    set({
      sessions,
      selectedSessionId,
      tickets,
      selectedTicketId: null,
    });
  },

  selectTicket: (ticketId) => {
    set({ selectedTicketId: ticketId });
  },
}));
