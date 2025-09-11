import api from './api';

// 获取所有周边商品，支持前端名称模糊查询
export const fetchMerchandiseList = (query = '') =>
  api
    .get('/merchandises/distinct', { params: { query } })
    .then((res) => res.data);
