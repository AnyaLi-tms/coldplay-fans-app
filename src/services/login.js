import api from './api';

export async function register(username, password) {
  try {
    const response = await api.post('user/register', { username, password });
    return response;
  } catch (err) {
    return err?.response || { data: { success: false, message: err.message} };
  }
}

export async function login(username, password) {
  try {
    const response = await api.post('user/login', { username, password });
    
    return response;
  } catch (err) {
    return err?.response || { data: { success: false, message: err.message} };
  }
}
