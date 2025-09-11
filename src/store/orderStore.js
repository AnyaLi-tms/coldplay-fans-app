import { create } from 'zustand';
import { loadMerchandiseOrders, buyMerchandise } from '../services/order';

export const useOrderStore = create((set, get) => ({
  merchandiseOrders: [],
  loading: false,
  error: null,

  fetchBuyMerchandise: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await buyMerchandise(data);
      set({ merchandiseOrders: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data || err.message, loading: false });
      return err.response?.data || { status: 'false', msg: '购买周边失败' };
    }
  },

  loadMerchandiseOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await loadMerchandiseOrders();
      set({ merchandiseOrders: res, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));
