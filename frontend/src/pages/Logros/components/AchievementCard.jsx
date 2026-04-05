export default function AchievementCard({ title, description, iconSrc, unlocked, rarity, secret }) {
  const isHidden = secret && !unlocked;

  return (
    <div
      className={`
        relative p-3 rounded-2xl border-2 flex flex-col items-center gap-2
        transition-all duration-150 h-36
        ${unlocked
          ? "bg-[#f0fdf4] border-[#86efac] shadow-[0_2px_0_#6ee7a0] hover:-translate-y-1 hover:shadow-[0_4px_0_#4ade80]"
          : "bg-[#f4f4f8] border-[#e4e4ec] shadow-[0_1px_0_#ddd]"
        }
      `}
    >
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
        ${unlocked
          ? "bg-white shadow-[0_1px_0_#86efac] border border-[#bbf7d0]"
          : "bg-[#ebebf0]"
        }
        ${!unlocked ? "grayscale opacity-30" : ""}
      `}>
        <img
          src={isHidden ? "/locked.webp" : iconSrc}
          className="w-8 h-8 object-contain"
        />
      </div>

      <p className={`text-[16px] font-black text-center leading-tight w-full
        ${unlocked ? "text-[#166534]" : "text-[#bbb]"}
      `}>
        {isHidden ? "???" : title}
      </p>

      <p className={`text-[13px] text-center leading-tight font-black w-full
        ${unlocked && !isHidden ? "text-[#232725]" : "invisible"}
      `}>
        {isHidden ? "placeholder" : description}
      </p>
    </div>
  );
}