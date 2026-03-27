export default function StatsCard({ title, value, icon }) {
    return (
      <div
        className="
          group relative p-6 rounded-xl 
          bg-gradient-to-br from-slate-900/60 to-slate-800/40 
          border border-white/10 shadow-xl 
          backdrop-blur-md
          transition-all duration-300 
          hover:scale-[1.03] hover:shadow-2xl hover:border-purple-500/40
        "
      >
        {/* Glow animado */}
        <div
          className="
            absolute inset-0 rounded-xl opacity-0 
            group-hover:opacity-20 
            bg-gradient-to-r from-purple-500 to-pink-500 
            blur-xl transition-all duration-500
          "
        />
  
        {/* Contenido */}
        <div className="relative z-10 flex items-center gap-4">
          {/* Icono */}
          <div className="text-4xl text-purple-400 drop-shadow-lg">
            {icon}
          </div>
  
          {/* Texto */}
          <div>
            <p className="text-sm uppercase tracking-wide text-white/60 font-semibold">
              {title}
            </p>
            <p className="text-3xl font-bold text-white mt-1">
              {value}
            </p>
          </div>
        </div>
      </div>
    );
  }
  