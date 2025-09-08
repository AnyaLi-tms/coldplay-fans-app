import api from './api';

export async function register(username, password) {
  try {
    const response = await api.post('/register', { username, password });
    return response;
  } catch (err) {
    return err?.response || { data: { success: false, message: '网络错误' } };
  }
}

export async function login(username, password) {
  try {
    const response = await api.post('/login', { username, password });
    return response;
  } catch (err) {
    return err?.response || { data: { success: false, message: '网络错误' } };
  }
}
