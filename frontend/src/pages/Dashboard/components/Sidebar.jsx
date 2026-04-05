import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "/library", icon: "book", label: "Librería" },
    { to: "/logros", icon: "license", label: "Logros" },
  ];

  return (
    <aside
      style={{
        fontFamily: "'Nunito', sans-serif",
        background: 'rgba(255,255,255,0.7)',
        borderRight: '2px solid #e0e0e8',
        boxShadow: '2px 0 0 #d0d0da',
      }}
      className="relative w-20 flex-shrink-0 flex flex-col items-center py-6 gap-4"
    >
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
            <Link key={to} to={to} title={label} className="flex flex-col items-center gap-1">
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
  );
}