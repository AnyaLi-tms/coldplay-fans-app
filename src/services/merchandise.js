import api from './api';

// 获取所有周边商品，支持前端名称模糊查询
// export const fetchMerchandiseList = (keyword = '') =>
//    api.get('/merchandises').then((res) => {
// //     if (!keyword) return res.data;
// //     return res.data.filter((item) => item.name.includes(keyword));
// //   });
export const getAllConcerts = (params = {}) =>
  api.get('/concerts', { params }).then((res) => res.data);
export const loadMerchandiseOrders = () =>
  api.get('/myMerchandise').then((res) => res.data);

export const buyMerchandise = async (data) =>
  api.put('/merchandises/buyMerchandise', data);

// 获取所有周边商品，支持后端模糊查询
export const fetchMerchandiseList = (query = '') => {
  if (!query) {
    // 获取全部商品
    return api.get('/merchandises/distinct').then((res) => res.data);
  } else {
    // 后端模糊查询，参数名为 query
    return api
      .get('/merchandises/distinct', { params: { query } })
      .then((res) => res.data);
  }
};
