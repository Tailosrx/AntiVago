import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import CreateReadingForm from "../../components/Forms/CreateReadingForm";
import ReadingCard from "../../components/Dashboard/ReadingCard";


export default function Dashboard() {
  const { user, logout } = useAuth();
  const [readings, setReadings] = useState([]);
  const [games, setGames] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("readings");
  const [showForm, setShowForm] = useState(false);

  // Cargar datos UNA SOLA VEZ al montar
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [readingsRes, gamesRes, animesRes] = await Promise.all([
          api.get("/entries/reading"),
          api.get("/entries/game"),
          api.get("/entries/anime"),
        ]);

        setReadings(readingsRes.data.readings || []);
        setGames(gamesRes.data.games || []);
        setAnimes(animesRes.data.animes || []);
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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

  const handleCreateReading = async (data) => {
    try {
      const response = await api.post("/entries/reading", data);
      setReadings([response.data.entry, ...readings]);
      setShowForm(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error };
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro?")) {
      try {
        await api.delete(`/entries/reading/${id}`);
        setReadings(readings.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Calcular stage basado en totales
  const total = readings.length + (games?.length || 0) + (animes?.length || 0);
  let stage = 1;
  let stageEmoji = "👤";
  let stageName = "Principiante";
  let stageColor = "from-gray-400 to-gray-600";

  if (total >= 50) {
    stage = 5;
    stageEmoji = "👑";
    stageName = "Inmortal";
    stageColor = "from-yellow-400 to-yellow-600";
  } else if (total >= 21) {
    stage = 4;
    stageEmoji = "🔥";
    stageName = "Leyenda";
    stageColor = "from-orange-400 to-red-600";
  } else if (total >= 11) {
    stage = 3;
    stageEmoji = "💪";
    stageName = "Experto";
    stageColor = "from-green-400 to-emerald-600";
  } else if (total >= 6) {
    stage = 2;
    stageEmoji = "👥";
    stageName = "Aficionado";
    stageColor = "from-blue-400 to-blue-600";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Sidebar */}
      <Sidebar user={user} logout={logout} total={total} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b border-purple-500/20 backdrop-blur-md bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-purple-300">Bienvenido de vuelta</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg">
                <p className="text-sm font-bold text-purple-300">📈 5 DAY STREAK</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Daily Quests & Currently Consuming */}
            <div className="lg:col-span-2 space-y-8">
              <DailyQuests />
              <CurrentlyReading readings={readings} />
            </div>

            {/* Right: Leaderboard */}
            <div>
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
    </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}