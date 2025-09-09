import { create } from 'zustand';

export const useTicketSelectStore = create((set, get) => ({
  sessions: [], // [{id, date, weekday, time, discount}]
  tickets: [], // [{id, price, soldOut, discount, finalPrice}]
  selectedSessionId: null,
  selectedTicketId: null,

  fetchTicketData: async (concertId) => {
    // TODO: 替换为真实API
    // 模拟数据
    const sessions = [
      {
        id: 's1',
        date: '2025-10-11',
        weekday: '星期六',
        time: '19:30',
        discount: '8.5折起',
      },
      {
        id: 's2',
        date: '2025-10-12',
        weekday: '星期日',
        time: '19:30',
        discount: '8.5折起',
      },
    ];
    const tickets = [
      { id: 't1', price: 80, soldOut: true },
      { id: 't2', price: 180 },
      { id: 't3', price: 280 },
      { id: 't4', price: 380 },
      { id: 't5', price: 480, discount: '8.5折', finalPrice: 408 },
      { id: 't6', price: 580, discount: '8.5折', finalPrice: 493 },
      { id: 't7', price: 680, discount: '8.5折', finalPrice: 578 },
    ];
    set({
      sessions,
      tickets,
      selectedSessionId: sessions[0].id,
      selectedTicketId: null,
    });
  },

  selectSession: (sessionId) => {
    set({ selectedSessionId: sessionId, selectedTicketId: null });
    // 可根据sessionId请求不同票档
  },

  selectTicket: (ticketId) => {
    set({ selectedTicketId: ticketId });
  },
}));
