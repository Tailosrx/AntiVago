import { useState } from "react";
import LibraryItem from "./LibraryItem";
import ItemModal from "./ItemModal";


export default function SectionBook({ readings, games, animes }) {
  const allItems = [
    ...readings.map((r) => ({ ...r, type: "libro" })),
    ...games.map((g) => ({ ...g, type: "juego" })),
    ...animes.map((a) => ({ ...a, type: "anime" })),
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const [sortBy, setSortBy] = useState("recent");

  const handleUpdateItem = (updatedItem) => {
    setSelectedItem(null);

    const updated = allItems.map((i) =>
      i.id === updatedItem.id ? updatedItem : i
    );


    //mirar de mantener separados los tipos de ocio
  }

  // 1. FILTRO
  const filteredItems = allItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "in-progress") return item.status !== "completed";
    if (activeFilter === "completed") return item.status === "completed";
    if (activeFilter === "wishlist") return item.status === "wishlist";
  });

  // 2. ORDENADO
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "percentage") return (b.progress || 0) - (a.progress || 0);
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <div className="p-8 flex flex-col gap-8 max-w-[80rem] mx-auto w-full">

      {/* FILTERS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex p-1 bg-slate-200 dark:bg-primary/10 rounded-xl overflow-x-auto no-scrollbar">

          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition
              ${activeFilter === "all"
                ? "bg-white dark:bg-primary text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-primary"}
            `}
          >
            Todo
          </button>

          <button
            onClick={() => setActiveFilter("in-progress")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition
              ${activeFilter === "in-progress"
                ? "bg-white dark:bg-primary text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-primary"}
            `}
          >
            En Progreso
          </button>

          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition
              ${activeFilter === "completed"
                ? "bg-white dark:bg-primary text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-primary"}
            `}
          >
            Completado
          </button>

          <button
            onClick={() => setActiveFilter("wishlist")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition
              ${activeFilter === "wishlist"
                ? "bg-white dark:bg-primary text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-primary"}
            `}
          >
            Próximamente
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Ordenar por:</span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer"
          >
            <option value="recent">Reciente</option>
            <option value="title">Título</option>
            <option value="percentage">Porcentaje</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {sortedItems.map((item) => (
          <LibraryItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          
        ))}

          {/* MODAL */}
      {selectedItem && (
        <ItemModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onUpdate={handleUpdateItem}
        />
      )}
      </div>
    </div>
  );
}
