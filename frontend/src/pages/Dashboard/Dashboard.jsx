import { useState, useEffect } from "react";
import api from "../../services/api";
import Sidebar from "./components/Sidebar";
import DailyQuests from "./components/DailyQuests";
import Leaderboard from "./components/Leaderboard";
import StatsCard from "./components/StatsCard";

export default function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [games, setGames] = useState([]);
  const [animes, setAnimes] = useState([]);

  const [loading, setLoading] = useState(true);

  // Cargar datos UNA SOLA VEZ al montar
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-white text-lg font-semibold">
            Cargando tu colección...
          </p>
        </div>
      </div>
    );
  }

  // 📚 Libros completados
const readingsCompleted = readings.filter(r => r.status === "completed").length;

// 🎮 Horas jugadas totales
const totalHours = games.reduce((acc, g) => acc + (g.hoursPlayed || 0), 0);

// 🎬 Anime completado
const animeCompleted = animes.filter(a => a.status === "completed").length;


  // Calcular stage basado en totales

  return (
    <div className="bg-[#1B1022] text-white font-['Space_Grotesk'] flex min-h-screen w-full overflow-hidden overflow-x-hidden overflow-y-hidden">
      <Sidebar />
  
      <main className="relative flex-1 overflow-y-auto">
        <div className="p-8 flex flex-col gap-8 max-w-[80rem] mx-auto w-full">
  
          {/* GRID PRINCIPAL */}
          <div className="grid grid-cols-[2fr_1fr] gap-2">
            <div className="min-w-0">
          
            </div>
          </div>
  
          {/* ⭐ NUEVA SECCIÓN: TARJETAS ANIMADAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-40">
            <StatsCard title="Libros leídos" value={readingsCompleted} icon="📚" />
            <StatsCard title="Horas jugadas" value={totalHours} icon="🎮" />
            <StatsCard title="Anime completado" value={animeCompleted} icon="🎬" />
          </div>
  
        </div>
      </main>
    </div>
  );
  
}
