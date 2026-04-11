export default function AchievementCard({ title, description, iconSrc, unlocked, rarity, secret }) {
  const isHidden = secret && !unlocked;

  return (
    <div
      className={`
        relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-2xl border-2 flex flex-col items-center gap-1 sm:gap-2
        transition-all duration-150 h-28 sm:h-32 md:h-36 lg:h-40
        ${unlocked
          ? "bg-[#f0fdf4] border-[#86efac] shadow-[0_1px_0_#6ee7a0] sm:shadow-[0_2px_0_#6ee7a0] hover:-translate-y-1 hover:shadow-[0_2px_0_#4ade80] sm:hover:shadow-[0_4px_0_#4ade80]"
          : "bg-[#f4f4f8] border-[#e4e4ec] shadow-[0_1px_0_#ddd]"
        }
      `}
    >
      <div className={`
        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0
        ${unlocked
          ? "bg-white shadow-[0_1px_0_#86efac] border border-[#bbf7d0]"
          : "bg-[#ebebf0]"
        }
        ${!unlocked ? "grayscale opacity-30" : ""}
      `}>
        <img
          src={isHidden ? "/locked.webp" : iconSrc}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
        />
      </div>

      <p className={`text-xs sm:text-sm md:text-base lg:text-lg font-black text-center leading-tight w-full px-1
        ${unlocked ? "text-[#166534]" : "text-[#bbb]"}
      `}>
        {isHidden ? "???" : title}
      </p>

      <p className={`text-[10px] sm:text-xs md:text-sm lg:text-base text-center leading-tight font-black w-full px-1
        ${unlocked && !isHidden ? "text-[#232725]" : "invisible"}
      `}>
        {isHidden ? "placeholder" : description}
      </p>
    </div>
  );
}