import api from './api';

export const loadMerchandiseOrders = () =>
  api.get('/merchandises/myMerchandise').then((res) => res.data);

export const buyMerchandise = async (data) =>
  api.put('/merchandises/buyMerchandise', data);
