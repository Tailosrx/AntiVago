import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import Sidebar from '../Dashboard/components/Sidebar';
import LibraryCard from '../../components/Library/LibraryCard';

export default function Library() {
  const { user, logout } = useAuth();
  const [readings, setReadings] = useState([]);
  const [games, setGames] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('books');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [readingsRes, gamesRes, animesRes] = await Promise.all([
          api.get('/entries/reading'),
          api.get('/entries/game'),
          api.get('/entries/anime')
        ]);
        
        setReadings(readingsRes.data.readings || []);
        setGames(gamesRes.data.games || []);
        setAnimes(animesRes.data.animes || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const total = readings.length + (games?.length || 0) + (animes?.length || 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-white text-lg font-semibold">Cargando tu librería...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Sidebar */}
      <Sidebar user={user} logout={logout} total={total} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b border-purple-500/20 backdrop-blur-md bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Library
              </h1>
              <div className="flex gap-6 mt-2 text-sm text-purple-300">
                <button onClick={() => setActiveTab('books')} className={activeTab === 'books' ? 'text-white font-bold' : ''}>
                  📚 Library
                </button>
                <button onClick={() => setActiveTab('wishlist')} className={activeTab === 'wishlist' ? 'text-white font-bold' : ''}>
                  ❤️ Wishlist
                </button>
                <button onClick={() => setActiveTab('analytics')} className={activeTab === 'analytics' ? 'text-white font-bold' : ''}>
                  📊 Stats
                </button>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search library..."
              className="px-4 py-2 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          {activeTab === 'books' && (
            <div>
              <div className="mb-6 flex items-center gap-2">
                <h2 className="text-xl font-black text-white">Books</h2>
                <span className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-bold">
                  {readings.length}
                </span>
              </div>
              
              {readings.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-6xl mb-4">📚</p>
                  <p className="text-white font-bold">No books yet</p>
                  <p className="text-purple-300">Start adding books to your library</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {readings.map(book => (
                    <LibraryCard key={book.id} item={book} type="book" />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">❤️</p>
              <p className="text-white font-bold">Wishlist Coming Soon</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">📊</p>
              <p className="text-white font-bold">Analytics Coming Soon</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}