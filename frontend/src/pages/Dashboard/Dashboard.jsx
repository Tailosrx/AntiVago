import { useState, useEffect } from "react";
import api from "../../services/api";
import Sidebar from "./components/Sidebar";
import DailyQuests from "./components/DailyQuests";
import Leaderboard from "./components/Leaderboard";
import Header from "./components/Header";
import CurrentlyReading from "./components/CurrentlyReading";

export default function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos UNA SOLA VEZ al montar
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [readingsRes] = await Promise.all([
          api.get("/entries/reading"),
          api.get("/entries/game"),
          api.get("/entries/anime"),
        ]);

        setReadings(readingsRes.data.readings || []);
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

  // Calcular stage basado en totales

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-content">
          {/* Fila superior: DailyQuests + Leaderboard */}
          <div className="dashboard-row">
            <DailyQuests />
            <Leaderboard />
          </div>

          {/* Fila inferior: CurrentlyReading */}
          <CurrentlyReading readings={readings} />
        </div>
      </main>
    </div>
  );
}