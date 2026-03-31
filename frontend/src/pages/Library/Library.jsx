import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import Sidebar from "../Dashboard/components/Sidebar";
import SectionBook from "./components/SectionBook";
import Header from "../Dashboard/components/Header";
import CreateReadingModal from "./components/CreateReadingModal";
import CreateAnimeModal from "./components/CreateAnimeModal"; 
import CreateGameModal from "./components/CreateGameModal"; 

export default function Library() {
  const { user, logout } = useAuth();
  const [readings, setReadings] = useState([]);
  const [games, setGames] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("books");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); 

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

  const handleAddBook = async (data) => {
    try {
      const response = await api.post("/entries/reading", data);
      setReadings([response.data.entry, ...readings]);
      setShowModal(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error };
    }
  };

  const handleAddGame = async (data) => {  // ✅ AGREGAR
    try {
      const response = await api.post("/entries/game", data);
      setGames([response.data.entry, ...games]);
      setShowModal(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error };
    }
  };

  const handleAddAnime = async (data) => {  // ✅ AGREGAR
    try {
      const response = await api.post("/entries/anime", data);
      setAnimes([response.data.entry, ...animes]);
      setShowModal(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error };
    }
  };

  const total = readings.length + (games?.length || 0) + (animes?.length || 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-white text-lg font-semibold">
            Cargando tu librería...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1B1022] text-white font-['Space_Grotesk'] flex min-h-screen w-full overflow-hidden">
  
      {/* SIDEBAR */}
      <Sidebar />
  
      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 overflow-y-auto">
  
        <Header />
  
        <main className="flex-1 p-8 lg:px-20">
          {/* Tabs */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("books")}
                className={`text-2xl font-black pb-2 transition-all ${
                  activeTab === "books"
                    ? "text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text border-b-2 border-purple-400"
                    : "text-purple-300 hover:text-white"
                }`}
              >
                📚 Libros
              </button>
              <button
                onClick={() => setActiveTab("games")}
                className={`text-2xl font-black pb-2 transition-all ${
                  activeTab === "games"
                    ? "text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text border-b-2 border-purple-400"
                    : "text-purple-300 hover:text-white"
                }`}
              >
                🎮 Juegos
              </button>
              <button
                onClick={() => setActiveTab("animes")}
                className={`text-2xl font-black pb-2 transition-all ${
                  activeTab === "animes"
                    ? "text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text border-b-2 border-purple-400"
                    : "text-purple-300 hover:text-white"
                }`}
              >
                🎬 Animes
              </button>
            </div>

            {/* Botón dinámico según tab */}
            <button
              onClick={() => {
                setModalType(activeTab);
                setShowModal(true);
              }}
              className="px-6 py-3 rounded-lg font-black text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-600/50 hover:scale-105 transition-all duration-300"
            >
              {activeTab === "books" && "✨ Agregar Libro"}
              {activeTab === "games" && "✨ Agregar Juego"}
              {activeTab === "animes" && "✨ Agregar Anime"}
            </button>
          </div>

          {/* Modales */}
          {showModal && modalType === "books" && (
            <CreateReadingModal
              onSubmit={handleAddBook}
              onClose={() => setShowModal(false)}
            />
          )}
          {showModal && modalType === "games" && (
            <CreateGameModal
              onSubmit={handleAddGame}
              onClose={() => setShowModal(false)}
            />
          )}
          {showModal && modalType === "animes" && (
            <CreateAnimeModal
              onSubmit={handleAddAnime}
              onClose={() => setShowModal(false)}
            />
          )}

          {/* Sección dinámica según tab */}
          {activeTab === "books" && (
            <SectionBook 
              readings={readings}
              games={games}
              animes={animes}
              setReadings={setReadings}
              setGames={setGames}
              setAnimes={setAnimes}
              type="books"
            />
          )}

          {activeTab === "games" && (
            <SectionBook 
              readings={readings}
              games={games}
              animes={animes}
              setReadings={setReadings}
              setGames={setGames}
              setAnimes={setAnimes}
              type="games"
            />
          )}

          {activeTab === "animes" && (
            <SectionBook 
              readings={readings}
              games={games}
              animes={animes}
              setReadings={setReadings}
              setGames={setGames}
              setAnimes={setAnimes}
              type="animes"
            />
          )}
          
        </main>
  
  
      </div>

      {/* Modal */}
    </div>
  );
}