export default function StatsCard({ title, value, icon }) {
  const isImage = typeof icon === "string" && (icon.endsWith(".png") || icon.endsWith(".jpg") || icon.startsWith("/"));

  return (
    <div
      className="
        bg-white rounded-[18px] border-[3px] border-[#e0e0e8]
        shadow-[0_3px_0_#d0d0da] p-5
        flex items-center gap-4
        transition-all duration-150
        hover:-translate-y-0.5 hover:shadow-[0_5px_0_#c8c8d4]
        cursor-default
      "
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#f4f4f8] border-2 border-[#e4e4ec] shadow-[0_2px_0_#ddd] flex items-center justify-center text-3xl flex-shrink-0">
        {isImage ? (
          <img src={icon} alt={title} className="w-10 h-10 object-contain" />
        ) : (
          icon
        )}
      </div>

      <div>
        <p className="text-[11px] font-extrabold text-[#aaa] uppercase tracking-wider mb-0.5">
          {title}
        </p>
        <p className="text-3xl font-black text-[#222] leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}
