import api from './api';

// 获取所有周边商品，支持前端名称模糊查询
export const fetchMerchandiseList = (keyword = '') =>
  api.get('/merchandises').then((res) => {
    if (!keyword) return res.data;
    return res.data.filter((item) => item.name.includes(keyword));
  });

export const loadMerchandiseOrders = () =>
  api.get('/myMerchandise').then((res) => res.data);

export const buyMerchandise = async (data) =>
  api.put('/merchandises/buyMerchandise', data);
