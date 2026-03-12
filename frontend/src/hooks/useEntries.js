import { useState, useEffect } from 'react';
import api from '../services/api';

export const useEntries = () => {
  const [readings, setReadings] = useState([]);
  const [games, setGames] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener todas mis lecturas
  const fetchReadings = async () => {
    try {
      const response = await api.get('/entries/reading');
      setReadings(response.data.readings || []);
    } catch (err) {
      console.error('Error fetching readings:', err);
      setError(err.response?.data?.error || 'Error al cargar libros');
    }
  };

  // Obtener todos mis juegos
  const fetchGames = async () => {
    try {
      const response = await api.get('/entries/game');
      setGames(response.data.games || []);
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  };

  // Obtener todos mis animes
  const fetchAnimes = async () => {
    try {
      const response = await api.get('/entries/anime');
      setAnimes(response.data.animes || []);
    } catch (err) {
      console.error('Error fetching animes:', err);
    }
  };

  // Crear lectura
  const createReading = async (data) => {
    try {
      const response = await api.post('/entries/reading', data);
      setReadings([response.data.entry, ...readings]);
      return { success: true };
    } catch (err) {
      console.error('Error creating reading:', err);
      return { success: false, error: err.response?.data?.error };
    }
  };

  // Crear juego
  const createGame = async (data) => {
    try {
      const response = await api.post('/entries/game', data);
      setGames([response.data.entry, ...games]);
      return { success: true };
    } catch (err) {
      console.error('Error creating game:', err);
      return { success: false, error: err.response?.data?.error };
    }
  };

  // Crear anime
  const createAnime = async (data) => {
    try {
      const response = await api.post('/entries/anime', data);
      setAnimes([response.data.entry, ...animes]);
      return { success: true };
    } catch (err) {
      console.error('Error creating anime:', err);
      return { success: false, error: err.response?.data?.error };
    }
  };

  // Eliminar entry
  const deleteEntry = async (type, id) => {
    try {
      await api.delete(`/entries/${type}/${id}`);
      if (type === 'reading') {
        setReadings(readings.filter(r => r.id !== id));
      } else if (type === 'game') {
        setGames(games.filter(g => g.id !== id));
      } else if (type === 'anime') {
        setAnimes(animes.filter(a => a.id !== id));
      }
      return { success: true };
    } catch (err) {
      console.error('Error deleting entry:', err);
      return { success: false, error: err.response?.data?.error };
    }
  };

  // Cargar datos UNA SOLA VEZ al montar
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([fetchReadings(), fetchGames(), fetchAnimes()]);
      setLoading(false);
    };

    loadAllData();
  }, []); // Array vacío = solo se ejecuta una vez

  return {
    readings,
    games,
    animes,
    loading,
    error,
    fetchReadings,
    fetchGames,
    fetchAnimes,
    createReading,
    createGame,
    createAnime,
    deleteEntry
  };
};