import { create } from 'zustand';
import api from '../src/services/api';

const useCollectionStore = create((set) => ({
  collection: null,
  loading: false,

  fetchCollection: async () => {
    try {
      set({ loading: true });
      const response = await api.get('/entries/reading'); // Ajusta si tienes endpoint específico
      
      // Calcular totales (temporal hasta tener endpoint)
      const collection = {
        totalBooks: response.data.count || 0,
        totalGames: 0,
        totalAnime: 0,
        currentStage: 1,
        stageVisual: 'novice'
      };
      
      set({ collection, loading: false });
    } catch (error) {
      console.error('Error fetching collection:', error);
      set({ loading: false });
    }
  }
}));

export default useCollectionStore;