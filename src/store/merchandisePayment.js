import { create } from 'zustand';

export const useMerchandisePaymentStore = create((set, get) => ({
  merchandiseInfo: {
    type: '',
    name: '',
    description: '',
    price: null,
    stock: null,
    imageUrl: null,
  },

  
}));
