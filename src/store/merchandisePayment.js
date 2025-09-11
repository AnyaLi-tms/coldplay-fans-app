import { create } from 'zustand';
import {
  getMerchandiseById,
  submitMerchandisePayment,
} from '../services/merchandisePayment';
export const useMerchandisePaymentStore = create((set, get) => ({
  merchandiseInfo: {
    type: '',
    name: '',
    descryption: '',
    price: null,
    stock: null,
    imageUrl: null,
  },
  error: null,
  setError: (error) => set({ error }),
  getMerchandiseInfo: async (id) => {
    const response = await getMerchandiseById(id);
    if (response.Status === 200) {
      set({ merchandiseInfo: response.data });
    } else {
      set({ error: '获取商品信息失败' });
      console.log(get().error);
    }
  },
  submitMerchandisePayment: async (info) => {
    const response = await submitMerchandisePayment(info);
    if (response.Status === 200) {
      console.log('Payment successful:', response.data);
    } else {
      set({ error: '提交支付失败' });
      console.log(get().error);
    }
  },
}));
