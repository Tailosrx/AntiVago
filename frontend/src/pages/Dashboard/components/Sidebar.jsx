import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "/library", icon: "book", label: "Librería" },
    { to: "/logros", icon: "license", label: "Logros" },
  ];

  return (
    <>
      {/* Mobile - Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-lg flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-[#333]">menu</span>
      </button>

      {/* Sidebar - Desktop + Mobile modal */}
      <aside
        style={{
          fontFamily: "'Nunito', sans-serif",
          background: 'rgba(255,255,255,0.95)',
          borderRight: '2px solid #e0e0e8',
          boxShadow: '2px 0 0 #d0d0da',
        }}
        className={`
          fixed lg:relative w-20 lg:w-20 h-screen lg:h-auto
          flex-shrink-0 flex flex-col items-center py-6 gap-4
          transition-transform lg:translate-x-0 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close button mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-[#888]"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Logo */}
        <div className="w-12 h-12 bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-2xl flex items-center justify-center overflow-hidden mb-2">
          <img src="/antivago2.png" className="w-8 h-8 object-contain" />
        </div>

        {/* Divider */}
        <div className="w-8 h-0.5 bg-[#e0e0e8] rounded-full" />

        {/* Nav */}
        <nav className="flex flex-col items-center gap-3 flex-1">
          {links.map(({ to, icon, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                title={label}
                className="flex flex-col items-center gap-1"
              >
                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center
                  border-2 transition-all duration-150
                  ${active
                    ? "bg-[#222] border-[#111] shadow-[0_2px_0_#000] text-white"
                    : "bg-white border-[#ddd] shadow-[0_2px_0_#ccc] text-[#888] hover:bg-[#f4f4f8] hover:text-[#333]"
                  }
                `}>
                  <span className="material-symbols-outlined text-[22px]">{icon}</span>
                </div>
                <p className={`text-[10px] font-black text-center
                  ${active ? "text-[#222]" : "text-[#bbb]"}
                `}>
                  {label}
                </p>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="w-8 h-0.5 bg-[#e0e0e8] rounded-full" />

        {/* Settings */}
        <div className="w-12 h-12 bg-white border-2 border-[#ddd] shadow-[0_2px_0_#ccc] rounded-2xl flex items-center justify-center text-[#aaa] hover:text-[#333] hover:bg-[#f4f4f8] transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}