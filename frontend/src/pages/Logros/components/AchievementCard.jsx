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
        relative p-4 h-40 rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-xl
        transition-all duration-300
        ${unlocked ? "opacity-100" : "opacity-40 grayscale"}
        hover:scale-[1.03] hover:shadow-xl
      `}
    >
      {unlocked && (
        <div
          className={`
            absolute inset-0 rounded-2xl blur-2xl opacity-20
            ${rarityColors[rarity]}
          `}
        />
      )}

      <div className="relative z-10 flex justify-center mb-2">
        <img
          src={isHidden ? "/secret.webp" : iconSrc}
          className="w-12 h-12 object-contain drop-shadow-md"
        />
      </div>

      <h3 className="relative z-10 text-sm font-semibold text-center">
        {isHidden ? "Logro secreto" : title}
      </h3>
    </div>
  );
}
