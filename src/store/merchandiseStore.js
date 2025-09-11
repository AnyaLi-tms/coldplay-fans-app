import { create } from 'zustand';
import {
  fetchMerchandiseList,
  loadMerchandiseOrders,
  buyMerchandise,
} from '../services/merchandise';

export const useMerchandiseStore = create((set, get) => ({
  merchandiseOrders: [],
  merchandise: [],
  loading: false,
  error: null,

  fetchMerchandise: async (query = '') => {
    set({ loading: true, error: null });
    try {
      const list = await fetchMerchandiseList(query);
      set({ merchandise: list, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

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
      set({ merchandiseOrders: res.data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));

export default useMerchandiseStore;
