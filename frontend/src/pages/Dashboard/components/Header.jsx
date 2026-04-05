import { useAuth } from "../../../hooks/useAuth";
import { useState, useEffect } from "react";

export default function Header() {
  const { user } = useAuth();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-ES', { month: '2-digit', day: '2-digit' });

  return (
    <header
      className="h-16 flex items-center justify-between px-6 flex-shrink-0"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Izquierda — placeholder para centrar */}
      <div className="flex items-center gap-3 w-48 invisible">
        <div className="w-9 h-9" />
      </div>

      {/* Centro — Logo pill ancho */}
      <div className="bg-white border-2 border-[#ddd] mt-6 shadow-[0_2px_0_#ccc] rounded-full px-8 py-2 flex items-center justify-center flex-1 max-w-lg mx-6">
      <span className="text-[20px] font-black text-[#716E77] tracking-tight">
          AntiVago
        </span>
      </div>

      {/* Derecha — Hora, fecha y avatar */}
      <div className="flex items-center mt-6 gap-3">
        {/* Hora y fecha */}
        <div className="bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-full px-4 py-1.5 flex items-center gap-2">
          <span className="text-[#888] text-[13px]">🕐</span>
          <span className="text-[14px] font-black text-[#333]">{timeStr}</span>
          <span className="text-[#ccc] font-bold">|</span>
          <span className="text-[14px] font-bold text-[#888]">{dateStr}</span>
        </div>

        {/* Avatar */}
        <div className="bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-full p-1 flex items-center gap-2 pr-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-black border-2 border-white overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" />
            ) : (
              user?.username?.[0]?.toUpperCase() || '?'
            )}
          </div>
          <span className="text-[13px] font-black text-[#333]">
            {user?.username || 'Usuario'}
          </span>
        </div>

        {/* Settings */}
        <button className="w-9 h-9 bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-full flex items-center justify-center hover:bg-[#f8f8fc] transition-all">
          <span className="material-symbols-outlined text-[#888] text-[18px]">settings</span>
        </button>
      </div>
    </header>
  );
}