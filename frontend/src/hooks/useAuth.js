import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const store = useAuthStore();

  useEffect(() => {
    store.fetchUser();
  }, []);

  return store;
};
