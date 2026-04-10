export default function LibraryItem({ item, onClick }) {
  const isCompleted = item.status === "completed";

  // Colores según tipo
  const typeColors = {
    libro: "bg-blue-600",
    juego: "bg-primary",
    anime: "bg-red-500",
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-lg lg:rounded-xl border-2 lg:border border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] overflow-hidden hover:shadow-lg hover:border-[#aaa] transition-all cursor-pointer"
    >
      {/* CHIP */}
      <div
        className="absolute top-1 lg:top-2 left-1 lg:left-2 px-1.5 lg:px-2 py-0.5 rounded-full text-[8px] lg:text-[10px] font-bold uppercase tracking-wide text-white z-10"
        style={{ background: typeColors[item.type] }}
      >
        {item.type === "libro" ? "📚" : item.type === "juego" ? "🎮" : "🎬"}
      </div>

      {/* CONTENEDOR QUE RECORTA */}
      <div className="aspect-[3/4] w-full overflow-hidden">
        <div
          className={`
            w-full h-full bg-cover bg-center transition-transform duration-300 
            group-hover:scale-105
            ${isCompleted ? "grayscale brightness-75" : ""}
          `}
          style={{ backgroundImage: `url(${item.photo})` }}
        />
      </div>

      <div className="p-2 lg:p-4">
        <h4 className="font-bold text-xs lg:text-lg leading-tight truncate">
          {item.title}
        </h4>
      </div>
    </div>
  );
}
