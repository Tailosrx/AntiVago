import { useState, useEffect } from "react";
import api from "../../services/api";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";

export default function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [games, setGames] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [readingsRes] = await Promise.all([api.get("/entries")]);
        setReadings(readingsRes.data.readings || []);
        setGames(readingsRes.data.games || []);
        setAnimes(readingsRes.data.animes || []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{
          backgroundColor: '#ececec',
          backgroundImage: 'radial-gradient(circle, #c0c0c0 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="text-center" style={{ fontFamily: "'Nunito', sans-serif" }}>
          <div className="animate-spin mb-4 mx-auto">
            <div className="h-14 w-14 border-4 border-[#555] border-t-transparent rounded-full"></div>
          </div>
          <p className="text-[#555] text-base font-extrabold">Cargando tu colección...</p>
        </div>
      </div>
    );
  }

  const readingsCompleted = readings.filter(r => r.status === "completed").length;
  const totalHours = games.reduce((acc, g) => acc + (g.hoursPlayed || 0), 0);
  const animeCompleted = animes.filter(a => a.status === "completed").length;
  const gamesCompleted = games.filter(g => g.status === "completed").length;

  return (
    <div
      className="pattern text-[#222] min-h-screen flex" 
      style={{ fontFamily: "'Nunito', sans-serif"}}
      
    >
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-12">
          <div className="bg-[#f5f5f8] rounded-2xl p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-[#222] mb-6">Dashboard</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="Libros leídos"     value={readingsCompleted} icon="/book.png" />
              <StatsCard title="Juegos completados" value={gamesCompleted}    icon="/game.png" />
              <StatsCard title="Horas jugadas"      value={totalHours}        icon="⏱️" />
              <StatsCard title="Animes completados" value={animeCompleted}    icon="/anime.png" />
            </div>

            <div className="mt-8">
              <p className="text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-4">
                Añadido recientemente
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  ...readings.slice(0, 2).map(r => ({ ...r, tipo: 'libro', emoji: '📚' })),
                  ...games.slice(0, 2).map(g => ({ ...g, tipo: 'juego', emoji: '🎮' })),
                  ...animes.slice(0, 2).map(a => ({ ...a, tipo: 'anime', emoji: '🎬' })),
                ]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 6)
                  .map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-[16px] border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] p-4 flex items-center gap-3"
                    >
                      {item.photo ? (
                        <img src={item.photo} className="w-12 h-12 rounded-xl object-cover border-2 border-[#e0e0e8] flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#f4f4f8] border-2 border-[#e4e4ec] flex items-center justify-center text-2xl flex-shrink-0">
                          {item.emoji}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-[13px] font-black text-[#222] truncate">{item.title}</p>
                        <span className="text-[10px] font-extrabold text-[#aaa] uppercase">{item.tipo}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
