export default function CollectionCard({ title, icon, unlocked, total, onClick, selected }) {
  const theme = {
    'Gamer Pro':          { bg: 'bg-[#d0e8ff]', hover: 'hover:border-[#5b9cf6] hover:shadow-[0_5px_0_#3b82f6]', selected: 'border-[#5b9cf6]', fill: '#5b9cf6' },
    'Rata de Biblioteca': { bg: 'bg-[#fff0d0]', hover: 'hover:border-[#f59e0b] hover:shadow-[0_5px_0_#d97706]', selected: 'border-[#f59e0b]', fill: '#f59e0b' },
    'Otaku Certificado':  { bg: 'bg-[#ffd0e8]', hover: 'hover:border-[#f472b6] hover:shadow-[0_5px_0_#ec4899]', selected: 'border-[#f472b6]', fill: '#ec4899' },
    'General':            { bg: 'bg-[#d0ffd8]', hover: 'hover:border-[#4ade80] hover:shadow-[0_5px_0_#22c55e]', selected: 'border-[#4ade80]', fill: '#22c55e' },
  };

  const t = theme[title] || theme['General'];

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-[18px] border-[3px] p-4 cursor-pointer
        transition-all duration-200 relative overflow-hidden
         ${selected
          ? "border-transparent rainbow-border shadow-[0_3px_0_#d0d0da]"
          : `border-[#e0e0e8] shadow-[0_3px_0_#d0d0da] hover:-translate-y-0.5 ${t.hover}`
        }
      `}
    >
      {/* Franja de color lateral */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[15px]"
        style={{ background: t.fill }}
      />

      {/* Top */}
      <div className="flex items-start gap-3 mb-3 pl-3">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 ${t.bg}`}>
          <img src={icon} className="w-10 h-10 object-contain" onError={(e) => e.target.style.display='none'} />
        </div>
        <div className="flex-1">
          <h3 className="text-[17px] font-black text-[#222] leading-tight mb-1">{title}</h3>
          <span
            className="rounded-md px-2 py-0.5 text-[11px] font-extrabold"
            style={{ background: t.fill + '22', color: t.fill }}
          >
            {title === 'Gamer Pro' ? 'Gaming'
              : title === 'Rata de Biblioteca' ? 'Lectura'
              : title === 'Otaku Certificado' ? 'Anime'
              : 'Global'}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mt-2 pl-3">
        <span className="text-[13px] font-black text-[#444] flex items-center gap-1 whitespace-nowrap">
        <img src="/oro.webp" className="w-6" />
        {unlocked}/{total}
        </span>
        <div className="flex-1 h-2.5 bg-[#e0e0e8] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${total > 0 ? (unlocked / total) * 100 : 0}%`,
              background: t.fill
            }}
          />
        </div>
      </div>
    </div>
  );
}