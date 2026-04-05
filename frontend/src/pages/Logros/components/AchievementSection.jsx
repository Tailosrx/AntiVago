import { useState } from "react";
import CollectionCard from "./CollectionCard";
import AchievementCard from "./AchievementCard";

export default function AchievementsSection({ achievements }) {
  const [activeCollection, setActiveCollection] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // Agrupar logros por categoría
  const collections = [
    {
      id: "reading",
      title: "Rata de Biblioteca",
      icon: "/book.png",
      achievements: achievements.filter(a => a.category === 'Rata de Biblioteca')
    },
    {
      id: "gaming",
      title: "Gamer Pro",
      icon: "/game.png",
      achievements: achievements.filter(a => a.category === 'Gamer Pro')
    },
    {
      id: "anime",
      title: "Otaku Certificado",
      icon: "/anime.png",
      achievements: achievements.filter(a => a.category === 'Otaku Certificado')
    }
  ].filter(c => c.achievements.length > 0); // Solo mostrar colecciones con logros

  const next = () => setCurrentIndex((prev) => (prev + 1) % collections.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));

  // Vista 1: Carrusel
  if (!activeCollection) {
    return (
      <div className="mt-6">
        <div className="flex items-center gap-3 mb-6">
        <div className="bg-white border-2 border-[#ddd] rounded-full px-4 py-1.5 text-[15px] font-black text-[#333] shadow-[0_2px_0_#ccc] flex items-center gap-2">
          <img src="/oro.webp" className="w-6" /> {achievements.filter(a => a.unlocked).length} logros
        </div>
        <span className="text-[13px] font-bold text-[#aaa]">
          de {achievements.length} totales
        </span>
      </div>

      
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {collections.map(c => {
          const unlocked = c.achievements.filter(a => a.unlocked).length;
          const total = c.achievements.length;
          return (
            <CollectionCard
              key={c.id}
              title={c.title}
              icon={c.icon}
              unlocked={unlocked}
              total={total}
              selected={selectedCard === c.id}
              onClick={() => {
                setSelectedCard(c.id);
                setTimeout(() => setActiveCollection(c.id), 150);
              }}
            />
          );
        })}
      </div>
    </div>
    );
  }

  // Vista 2: Álbum con animación
  const selected = collections.find((c) => c.id === activeCollection);

  return (
    <div className="animate-open">
      <button
        onClick={() => setActiveCollection(null)}
        className="
            mb-6 flex items-center gap-2 px-4 py-2
            bg-white border-2 border-[#e0e0e8] shadow-[0_2px_0_#d0d0da]
            rounded-xl font-extrabold text-sm text-[#555]
            hover:bg-[#f8f8fc] transition-all
          "
      >
        <span className="material-symbols-rounded text-xl">arrow_back</span>
        Volver
      </button>

      <div className="flex items-center gap-3 mb-6">
          <div className={`
            w-11 h-11 rounded-xl flex items-center justify-center
            ${selected.id === 'gaming' ? 'bg-[#d0e8ff]'
              : selected.id === 'reading' ? 'bg-[#fff0d0]'
              : selected.id === 'anime' ? 'bg-[#ffd0e8]'
              : 'bg-[#d0ffd8]'}
          `}>
            <img src={selected.icon} className="w-7 h-7 object-contain" />
          </div>
          <h2 className="text-2xl font-black text-[#222]">{selected.title}</h2>
          <span className="bg-[#e8e8f0] rounded-md px-2 py-0.5 text-[11px] font-extrabold text-[#777]">
            {selected.achievements.filter(a => a.unlocked).length}/{selected.achievements.length}
          </span>
        </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 py-10">
        {selected.achievements.map((a, index) => (
          <div
            key={a.id}
            className="trophy-anim"
            style={{ animationDelay: `${index * 0.07}s` }}
          >
            <AchievementCard
              title={a.name}
              description={a.description}
              iconSrc={a.iconUrl}
              unlocked={a.unlocked}
              rarity="bronze"
              secret={a.secret ?? false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}