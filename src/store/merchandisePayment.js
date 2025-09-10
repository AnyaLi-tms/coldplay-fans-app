import { create } from 'zustand';
export const useMerchandisePaymentStore = create((set, get) => ({
    merchandiseInfo: {
    id: null,
    name: '111',
    descryption: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
    price: 10,
    stock : 100,
    imageUrl: null,
  },
}));
