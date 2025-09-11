import api from './api';

// 获取所有周边商品，支持前端名称模糊查询
// export const fetchMerchandiseList = (keyword = '') =>
//    api.get('/merchandises').then((res) => {
// //     if (!keyword) return res.data;
// //     return res.data.filter((item) => item.name.includes(keyword));
// //   });
export const loadMerchandiseOrders = () =>
  api.get('/merchandises/myMerchandise').then((res) => res.data);

export const buyMerchandise = async (data) =>
  api.put('/merchandises/buyMerchandise', data);

// 获取所有周边商品，支持后端模糊查询
export const fetchMerchandiseList = (query = '') =>
  // 无论有无查询，都带上 query 参数，避免后端缺参报错
  api
    .get('/merchandises/distinct', { params: { query } })
    .then((res) => res.data);
