import { create } from 'zustand';
import { fetchMerchandiseList } from '../services/merchandise';

const useMerchandiseStore = create((set) => ({
  list: [],
  loading: false,
  keyword: '',
  async fetchList(keyword = '') {
    set({ loading: true, keyword });
    const res = await fetchMerchandiseList(keyword);
    set({ list: res, loading: false });
  },
  setKeyword(keyword) {
    set({ keyword });
  },
}));

export default useMerchandiseStore;
