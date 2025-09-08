import api from './api';

// 获取所有 Banner
export const getBanners = () => api.get('/banners').then((res) => res.data);

export const getBannerById = (id) =>
  api.get(`/banners/${id}`).then((res) => res.data);

// 创建 Banner
export const createBanner = (banner) => api.post('/banners', banner);

// 更新 Banner
export const updateBanner = (id, updatedBanner) =>
  api.put(`/banners/${id}`, updatedBanner);

// 删除 Banner
export const deleteBanner = (id) => api.delete(`/banners/${id}`);
