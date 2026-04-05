import { useState } from "react";
import api from "../../../services/api";
import LibraryItem from "./LibraryItem";
import ItemModal from "./ItemModal";

export default function SectionBook({ readings, games, animes, setReadings, setGames, setAnimes, type = "books" }) {
  const allItems = type === "books"
    ? readings.map(r => ({ ...r, type: "libro" }))
    : type === "games"
    ? games.map(g => ({ ...g, type: "juego" }))
    : animes.map(a => ({ ...a, type: "anime" }));

  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortBy, setSortBy] = useState("recent");

  const handleUpdate = async () => {
    setSelectedItem(null);
    try {
      if (type === "books") {
        const res = await api.get('/entries/reading');
        setReadings(res.data.readings || []);
      } else if (type === "games") {
        const res = await api.get('/entries/game');
        setGames(res.data.games || []);
      } else {
        const res = await api.get('/entries/anime');
        setAnimes(res.data.animes || []);
      }
    } catch (err) {
      console.error('Error reloading:', err);
    }
  };

  const filters = [
    { id: "all",         label: "Todo" },
    { id: "in-progress", label: "En Progreso" },
    { id: "completed",   label: "Completado" },
  ];

  const filteredItems = allItems.filter(item => {
    if (activeFilter === "all") return true;
    if (activeFilter === "in-progress") return item.status !== "completed";
    if (activeFilter === "completed") return item.status === "completed";
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "percentage") return (b.progressPercentage || 0) - (a.progressPercentage || 0);
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* Filters + sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">

        {/* Filtros */}
        <div className="flex gap-1.5 bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-2xl p-1.5">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`
                px-4 py-1.5 rounded-xl text-[13px] font-black transition-all duration-150
                ${activeFilter === f.id
                  ? "bg-[#222] text-white shadow-[0_2px_0_#000]"
                  : "text-[#999] hover:text-[#444] hover:bg-[#f4f4f8]"
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Ordenar */}
        <div className="flex items-center gap-2 bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da] rounded-2xl px-4 py-2">
          <span className="text-[12px] font-extrabold text-[#aaa] uppercase tracking-wide">Ordenar</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-transparent text-[13px] font-black text-[#333] focus:outline-none border-none cursor-pointer"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <option value="recent">Reciente</option>
            <option value="title">Título</option>
            <option value="percentage">Progreso</option>
          </select>
        </div>
      </div>

      {/* Contador */}
      <p className="text-[12px] font-extrabold text-[#aaa] uppercase tracking-wider">
        {sortedItems.length} {type === "books" ? "libros" : type === "games" ? "juegos" : "animes"}
      </p>

      {/* Grid */}
      {sortedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-5xl">
            {type === "books" ? "📚" : type === "games" ? "🎮" : "🎬"}
          </span>
          <p className="text-[#aaa] font-extrabold text-[14px]">No hay nada aquí todavía</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {sortedItems.map(item => (
            <LibraryItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
