import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'https://coldplay-fans-production.up.railway.app', // 推荐用环境变量
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) =>
    /* 可在此添加token等*/ /* config.headers.Authorization = "Bearer fake-token";*/ config,
  (error) => Promise.reject(error),
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) =>
    // 可在此统一处理错误
    Promise.reject(error),
);

export default api;
