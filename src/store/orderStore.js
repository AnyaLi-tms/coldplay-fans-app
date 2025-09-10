import { create } from 'zustand';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../services/order';

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAllOrders();
      set({ orders: res, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  fetchOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await getOrderById(id);
      return res;
    } catch (err) {
      set({ error: err, loading: false });
      return null;
    }
  },

  addOrder: async (order) => {
    set({ loading: true, error: null });
    try {
      const res = await createOrder(order);
      await get().fetchOrders();
      return res;
    } catch (err) {
      set({ error: err, loading: false });
      return null;
    }
  },

  updateOrder: async (id, updatedOrder) => {
    set({ loading: true, error: null });
    try {
      const res = await updateOrder(id, updatedOrder);
      await get().fetchOrders();
      return res;
    } catch (err) {
      set({ error: err, loading: false });
      return null;
    }
  },

  removeOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteOrder(id);
      await get().fetchOrders();
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));
