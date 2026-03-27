export default function AchievementCard({ title, description, iconSrc, unlocked, rarity, secret }) {
    const isHidden = secret && !unlocked;
  
    const rarityColors = {
      bronze: "bg-orange-300/20",
      silver: "bg-slate-300/20",
      gold: "bg-yellow-300/20",
      platinum: "bg-blue-300/20"
    };
  
    return (
      <div
        className={`
          relative p-6 h-96 rounded-3xl border border-white/10
          bg-white/5 backdrop-blur-xl
          transition-all duration-300
          ${unlocked ? "opacity-100" : "opacity-40 grayscale"}
          hover:scale-[1.02] hover:shadow-xl
          shadow-[0_0_20px_rgba(255,255,255,0.05)]
        `}
      >
        {/* Glow suave */}
        {unlocked && (
          <div className={`
            absolute inset-0 rounded-3xl blur-3xl opacity-20
            ${rarityColors[rarity]}
          `} />
        )}
  
        {/* Icono tipo sticker */}
        <div className="relative z-10 flex justify-center mb-4">
          <img
            src={isHidden ? "/secret.webp" : iconSrc}
            alt="trophy"
            className="w-24 h-24 object-contain drop-shadow-md"
          />
        </div>
  
        {/* Título */}
        <h3 className="relative z-10 text-lg font-semibold text-center tracking-wide">
          {isHidden ? "Logro secreto" : title}
        </h3>
  
        {/* Descripción */}
        <p className="relative z-10 text-white/60 text-sm text-center mt-1">
          {isHidden ? "???" : description}
        </p>
      </div>
    );
  }
  