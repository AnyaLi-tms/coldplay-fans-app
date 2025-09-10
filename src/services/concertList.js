import api from './api';

// 获取所有演唱会
export const getAllConcerts = (params = {}) =>
  api.get('/concerts', { params }).then((res) => res.data);
// 获取所有城市
export const getAllCities = () => api.get('/concerts/cities');
// 获取单个演唱会详情
export const getConcertById = (id) =>
  api.get(`/concerts/${id}`).then((res) => res.data);
// 新建演唱会
export const createConcert = (data) => api.post('/concerts', data);
// 删除演唱会
export const deleteConcert = (id) => api.delete(`/concerts/${id}`);
// 更新演唱会
export const updateConcert = (id, data) => api.put(`/concerts/${id}`, data);
