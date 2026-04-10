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
  const { user } = useAuth();
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

  const handleAddGame = async (data) => {
    try {
      const response = await api.post("/entries/game", data);
      setGames([response.data.entry, ...games]);
      setShowModal(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error };
    }
  };

  const handleAddAnime = async (data) => {
    try {
      const response = await api.post("/entries/anime", data);
      setAnimes([response.data.entry, ...animes]);
      setShowModal(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error };
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/entries/reading/${id}`);
      setReadings(readings.filter(r => r.id !== id));
      setShowModal(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error };
    }
  };

  const tabs = [
    { id: "books",  label: " Libros",  color: "#f59e0b" },
    { id: "games",  label: " Juegos",  color: "#5b9cf6" },
    { id: "animes", label: " Animes",  color: "#f472b6" },
  ];

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{
          backgroundColor: '#ececec',
          backgroundImage: 'radial-gradient(circle, #c0c0c0 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="text-center" style={{ fontFamily: "'Nunito', sans-serif" }}>
          <div className="animate-spin mb-4 mx-auto">
            <div className="h-14 w-14 border-4 border-[#555] border-t-transparent rounded-full"></div>
          </div>
          <p className="text-[#555] text-base font-extrabold">Cargando tu librería...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pattern text-[#222] flex min-h-screen w-full overflow-hidden"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Sidebar: oculto en móvil */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
  
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />
  
        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-12">
          <div className="bg-[#f5f5f8] rounded-2xl p-4 sm:p-6">
  
            {/* Tabs + botón */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
  
              {/* Tabs scrollables en móvil */}
              <div className="flex gap-2 bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-2xl p-1.5 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-4 py-2 whitespace-nowrap rounded-xl text-[14px] font-black transition-all duration-150
                      ${activeTab === tab.id
                        ? "bg-[#222] text-white shadow-[0_2px_0_#000]"
                        : "text-[#999] hover:text-[#444] hover:bg-[#f4f4f8]"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
  
              {/* Botón agregar */}
              <button
                onClick={() => { setModalType(activeTab); setShowModal(true); }}
                className="bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-2xl px-5 py-2.5 text-[14px] font-black text-[#333] hover:bg-[#f4f4f8] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#c8c8d4] transition-all duration-150 w-full sm:w-auto"
              >
                {activeTab === "books"  && "Agregar Libro"}
                {activeTab === "games"  && "Agregar Juego"}
                {activeTab === "animes" && "Agregar Anime"}
              </button>
            </div>
  
            {/* Modales */}
            {showModal && modalType === "books" && (
              <CreateReadingModal onSubmit={handleAddBook} onDelete={handleDeleteBook} onClose={() => setShowModal(false)} />
            )}
            {showModal && modalType === "games" && (
              <CreateGameModal onSubmit={handleAddGame} onClose={() => setShowModal(false)} />
            )}
            {showModal && modalType === "animes" && (
              <CreateAnimeModal onSubmit={handleAddAnime} onClose={() => setShowModal(false)} />
            )}
  
            {/* Contenido */}
            {activeTab === "books" && (
              <SectionBook readings={readings} games={games} animes={animes} setReadings={setReadings} setGames={setGames} setAnimes={setAnimes} type="books" />
            )}
            {activeTab === "games" && (
              <SectionBook readings={readings} games={games} animes={animes} setReadings={setReadings} setGames={setGames} setAnimes={setAnimes} type="games" />
            )}
            {activeTab === "animes" && (
              <SectionBook readings={readings} games={games} animes={animes} setReadings={setReadings} setGames={setGames} setAnimes={setAnimes} type="animes" />
            )}
  
          </div>
        </main>
      </div>
    </div>
  );
}  