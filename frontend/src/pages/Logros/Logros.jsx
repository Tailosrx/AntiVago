import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import Sidebar from "../Dashboard/components/Sidebar";
import Header from "../Dashboard/components/Header";
import AchievementCard from "./components/AchievementCard";
import AchievementsSection from "./components/AchievementSection";

export default function Logros() {
  const { user, logout } = useAuth();
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-white text-lg font-semibold">
            Cargando tus logros...
          </p>
        </div>
      </div>
    );
  }



 

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 px-0 py-0 lg:px-20">
          {/* 🏆 Título */}
          <h2 className="text-4xl font-bold mt-10 mb-6">Logros</h2>

          {/* ⭐ Barra de progreso general */}
          

          {/* 🧩 AQUÍ SOLO VA LA SECCIÓN COMPLETA */}
          <AchievementsSection
            readings={readings}
            games={games}
            animes={animes}
          />
        </main>
      </div>
    </div>
  );
}
