import api from './api';

// 获取所有订单
export const getAllOrders = () => api.get('/orders').then((res) => res.data);

// 获取单个订单详情
export const getOrderById = (id) =>
  api.get(`/orders/${id}`).then((res) => res.data);

// 新建订单
export const createOrder = (data) => api.post('/orders', data);

// 删除订单
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// 更新订单
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
