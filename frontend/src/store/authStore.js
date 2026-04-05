import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true, 

  // verifica token -- localStorage
  initAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
        loading: false 
      });
    } else {
      set({ loading: false }); 
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      set({
        token: response.data.token,
        user: response.data.user,
        isAuthenticated: true
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  },

  register: async (email, username, password) => {
    try {
      const response = await api.post('/auth/register', { email, username, password });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      set({
        token: response.data.token,
        user: response.data.user,
        isAuthenticated: true
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Register failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }
}));

//  auth cargado
useAuthStore.getState().initAuth();

export default useAuthStore;