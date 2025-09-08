import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'https://coldplay-fans-production.up.railway.app', // 推荐用环境变量
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'token': null,
  },
});

// 请求拦截器
api.interceptors.request.use(
  api.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token'); // 假设 token 存储在 localStorage 中

    if (token) {
      // 如果存在 token，添加到请求头中
      config.headers['token'] = token; 
      //console.log(token);// 或者使用 Authorization
      // config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // 返回修改后的 config
  },
  (error) => Promise.reject(error)
));

// 响应拦截器
api.interceptors.response.use(
   (response) => {
    // 假设 token 在 response.data.token 中
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token); // 将 token 存储到 localStorage
    }
    return response; // 返回响应
  },
  (error) => Promise.reject(error)
);

export default api;
