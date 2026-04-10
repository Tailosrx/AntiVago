import { useAuth } from "../../../hooks/useAuth";
import { useState, useEffect } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const [now, setNow] = useState(new Date());
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-ES', { month: '2-digit', day: '2-digit' });

  return (
    <header
      className="h-16 flex items-center justify-between px-4 lg:px-6 flex-shrink-0"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Izquierda — placeholder desktop, logo móvil */}
      <div className="flex items-center gap-3 w-48 invisible lg:visible">
        <div className="w-9 h-9" />
      </div>

      {/* Centro — Logo pill */}
      <div className="bg-white border-2 border-[#ddd] mt-6 shadow-[0_2px_0_#ccc] rounded-full px-4 lg:px-8 py-2 flex items-center justify-center flex-1 max-w-lg mx-2 lg:mx-6">
        <span className="text-base lg:text-[20px] font-black text-[#716E77] tracking-tight">
          AntiVago
        </span>
      </div>

      {/* Derecha — Hora/Avatar móvil simplificado */}
      <div className="flex items-center mt-6 gap-2 lg:gap-3">
        {/* Hora y fecha - Hidden en móvil pequeño */}
        <div className="hidden sm:flex bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-full px-3 lg:px-4 py-1.5 items-center gap-2">
          <span className="text-[#888] text-xs lg:text-[13px]">🕐</span>
          <span className="text-xs lg:text-[14px] font-black text-[#333]">{timeStr}</span>
          <span className="text-[#ccc] font-bold hidden lg:inline">|</span>
          <span className="text-xs lg:text-[14px] font-bold text-[#888] hidden lg:inline">{dateStr}</span>
        </div>

        {/* Avatar - Dropdown en móvil */}
        <div className="relative">
          <button
            onClick={() => setShowUser(!showUser)}
            className="bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-full p-1 flex items-center gap-2 pr-2 lg:pr-4 hover:bg-[#f8f8fc] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-black border-2 border-white overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover" />
              ) : (
                user?.username?.[0]?.toUpperCase() || '?'
              )}
            </div>
            <span className="hidden sm:inline text-xs lg:text-[13px] font-black text-[#333]">
              {user?.username?.substring(0, 8) || 'Usuario'}
            </span>
          </button>

          {/* Dropdown menu */}
          {showUser && (
            <div className="absolute right-0 top-12 bg-white border-2 border-[#ddd] shadow-[0_4px_0_#ccc] rounded-2xl p-3 z-50 min-w-48">
              <div className="text-xs font-bold text-[#888] mb-2">
                {user?.email}
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowUser(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-[#333] hover:bg-[#f4f4f8] transition-all"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          )}
        </div>

        {/* Settings - Hidden en móvil */}
        <button className="hidden sm:flex w-9 h-9 bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-full items-center justify-center hover:bg-[#f8f8fc] transition-all">
          <span className="material-symbols-outlined text-[#888] text-[18px]">settings</span>
        </button>
      </div>
    </header>
  );
}