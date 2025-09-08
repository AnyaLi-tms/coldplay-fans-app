// 推荐用axios或fetch实现http请求

const API_BASE = 'http://localhost:3000/api'; // 根据实际后端地址修改

export async function register(username, password) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: '网络错误' };
  }
}

export async function login(username, password) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: '网络错误' };
  }
}
