import { create } from 'zustand';
import { register, login } from '../services/login.js';
export const useLoginStore = create((set, get) => ({
  // UI State
  mode: 'login',
  username: '',
  password: '',
  confirmPassword: '',
  error: '',

  setMode: (mode) => set({ mode }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setError: (error) => set({ error }),

  // 密码验证函数
  validatePassword: (password) => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s])(?=.{8,16}$)/;
    return regex.test(password);
  },

  // 注册API
  registerUser: async (username, password) => {
    const res = await register(username, password);
    if (res.status === 201) {
      return true;
    }
    get().setError(res.data.error || '注册失败');
    console.log(get().error);
    return false;
  },

  // 登录API
  loginUser: async (username, password) => {
    const res = await login(username, password);
    if (res.status === 200) {
      return true;
    }
    get().setError(res.data.msg || '登录失败');
    return false;
  },
}));
