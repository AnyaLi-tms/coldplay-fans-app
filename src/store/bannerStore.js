import { create } from 'zustand';
import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../services/banner';

const useBannerStore = create((set, get) => ({
  banners: [],
  loading: false,
  error: null,

  fetchBanners: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getBanners();
      set({ banners: res, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  fetchBannerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await getBannerById(id);
      return res;
    } catch (err) {
      set({ error: err, loading: false });
      return null;
    }
  },

  addBanner: async (banner) => {
    set({ loading: true, error: null });
    try {
      const res = await createBanner(banner);
      await get().fetchBanners();
      return res;
    } catch (err) {
      set({ error: err, loading: false });
      return null;
    }
  },

  updateBanner: async (id, updatedBanner) => {
    set({ loading: true, error: null });
    try {
      const res = await updateBanner(id, updatedBanner);
      await get().fetchBanners();
      return res;
    } catch (err) {
      set({ error: err, loading: false });
      return null;
    }
  },

  removeBanner: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteBanner(id);
      await get().fetchBanners();
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));

export default useBannerStore;
