export default function LibraryItem({ item, onClick }) {
  const isCompleted = item.status === "completed";

  // Colores según tipo
  const typeColors = {
    libro: "bg-blue-600",
    juego: "bg-primary",
    anime: "bg-red-500",
  };

  return (
    <div onClick={onClick}
      className="group relative bg-white dark:bg-primary/5 rounded-xl 
                 border border-slate-200 dark:border-primary/20 
                 overflow-hidden hover:border-primary transition-all 
                 hover:shadow-xl hover:shadow-primary/10 
                 max-w-[200px] w-full mx-auto"
    >
      {/* CHIP */}
      <div
        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white ${typeColors[item.type]}`}
      >
        {item.type}
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

      <div className="p-4">
        <h4 className="font-bold text-lg leading-tight truncate">
          {item.title}
        </h4>
      </div>
    </div>
  );
}
