import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      set({ user, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login fallido'
      };
    }
  },

  register: async (email, password, username) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        username
      });
      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      set({ user, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registro fallido'
      };
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        set({ loading: false });
        return;
      }
      const response = await api.get('/auth/me');
      set({ user: response.data, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  }
}));

export default useAuthStore;
