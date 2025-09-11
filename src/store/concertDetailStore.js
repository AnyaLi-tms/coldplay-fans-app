import { create } from 'zustand';
import { fetchConcertDetail } from '../services/concertdetail';

export const useConcertDetailStore = create((set) => ({
  concert: {},
  loading: false,
  error: null,
  fetchDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchConcertDetail(id);
      console.log(data);
      set({ concert: data, loading: false });
    } catch (e) {
      set({ error: '获取演唱会详情失败', loading: false });
    }
  },
}));
