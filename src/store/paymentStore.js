import { create } from 'zustand';
import { buyTicket } from '../services/payment';

export const usePaymentStore = create((set) => ({
  loading: false,
  result: null,
  error: null,
  fetchBuyTicket: async (concertId, data) => {
    set({ loading: true, error: null, result: null });
    try {
      const res = await buyTicket(concertId, data);
      console.log(res);
      set({ result: res.data, loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data || err.message, loading: false });
      return err.response?.data || { status: 'false', msg: '购票失败' };
    }
  },
}));
