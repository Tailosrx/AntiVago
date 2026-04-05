import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import Sidebar from "../Dashboard/components/Sidebar";
import Header from "../Dashboard/components/Header";
import AchievementsSection from "./components/AchievementSection";

export default function Logros() {
  const { user, logout } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const achievementsRes = await api.get("/achievements/my");
        setAchievements(achievementsRes.data || []);
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
      <div className="flex items-center justify-center h-screen bg-[#ebebef]">
        <div className="text-center">
          <div className="animate-spin mb-4 mx-auto">
            <div className="h-14 w-14 border-4 border-[#555] border-t-transparent rounded-full"></div>
          </div>
          <p className="text-[#555] text-base font-extrabold">Cargando logros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pattern text-[#222] min-h-screen flex" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 px-6 py-6 lg:px-16">
          <div className="bg-[#f5f5f8] rounded-2xl p-6 shadow-inner">
            <h2 className="text-3xl font-black text-[#222] mb-2">Logros</h2>
            <AchievementsSection achievements={achievements} />
          </div>
        </main>
      </div>
    </div>
  );
}