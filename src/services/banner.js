import api from './api';

// 获取所有 Banner
export const getBanners = () => api.get('/banners');

// 根据 ID 获取 Banner
export const getBannerById = (id) => api.get(`/banners/${id}`);

// 创建 Banner
export const createBanner = (banner) => api.post('/banners', banner);

// 更新 Banner
export const updateBanner = (id, updatedBanner) =>
  api.put(`/banners/${id}`, updatedBanner);

// 删除 Banner
export const deleteBanner = (id) => api.delete(`/banners/${id}`);
