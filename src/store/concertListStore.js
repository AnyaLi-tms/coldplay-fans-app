import { create } from 'zustand';
import {
  getAllConcerts,
  getAllCities,
  getConcertById,
  createConcert,
  deleteConcert,
  updateConcert,
} from '../services/concertList';

const useConcertListStore = create((set, get) => ({
  concerts: [],
  cities: [],
  loading: false,
  error: null,

  fetchConcerts: async (params) => {
    set({ loading: true });
    try {
      const res = await getAllConcerts(params);
      const arr = Array.isArray(res) ? res : [];
      set({ concerts: arr, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchCities: async () => {
    set({ loading: true });
    try {
      const res = await getAllCities();
      set({ cities: res.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchConcertById: async (id) => {
    set({ loading: true });
    try {
      const res = await getConcertById(id);
      set({ concerts: [res.data], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  createConcert: async (data) => {
    set({ loading: true });
    try {
      await createConcert(data);
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteConcert: async (id) => {
    set({ loading: true });
    try {
      await deleteConcert(id);
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateConcert: async (id, data) => {
    set({ loading: true });
    try {
      await updateConcert(id, data);
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useConcertListStore;
