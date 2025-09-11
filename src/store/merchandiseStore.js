import { create } from 'zustand';
import { fetchMerchandiseList } from '../services/merchandise';

export const useMerchandiseStore = create((set, get) => ({
  merchandiseOrders: [],
  merchandise: [],
  loading: false,
  error: null,

  fetchMerchandise: async (keyword = '') => {
    set({ loading: true, error: null });
    try {
      const list = await fetchMerchandiseList(keyword);
      set({ merchandise: list, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));

export default useMerchandiseStore;
