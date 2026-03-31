import { useState } from "react";
import CollectionCard from "./CollectionCard";
import AchievementCard from "./AchievementCard";

export default function AchievementsSection({ achievements }) {
  const [activeCollection, setActiveCollection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Agrupar logros por categoría
  const collections = [
    {
      id: "reading",
      title: "Lector Ávido",
      icon: "📚",
      achievements: achievements.filter(a => a.category === 'Lector Ávido')
    },
    {
      id: "gaming",
      title: "Gamer Pro",
      icon: "🎮",
      achievements: achievements.filter(a => a.category === 'Gamer Pro')
    },
    {
      id: "anime",
      title: "Otaku Certificado",
      icon: "🎬",
      achievements: achievements.filter(a => a.category === 'Otaku Certificado')
    }
  ].filter(c => c.achievements.length > 0); // Solo mostrar colecciones con logros

  const next = () => setCurrentIndex((prev) => (prev + 1) % collections.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));

  // Vista 1: Carrusel
  if (!activeCollection) {
    return (
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Colecciones</h2>

        <div className="relative w-full max-w-4xl mx-auto">
          {/* Botón izquierda */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-5xl text-white/40 hover:text-white transition px-4 z-20"
          >
            ‹
          </button>

          {/* Ventana del carrusel */}
          <div className="overflow-hidden w-full rounded-3xl">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {collections.map((c) => {
                const unlocked = c.achievements.filter(
                  (a) => a.unlocked
                ).length;
                const total = c.achievements.length;

                return (
                  <div
                    key={c.id}
                    className="w-full flex-shrink-0 flex justify-center"
                  >
                    <CollectionCard
                      title={c.title}
                      icon={c.icon}
                      unlocked={unlocked}
                      total={total}
                      onClick={() => setActiveCollection(c.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botón derecha */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-5xl text-white/40 hover:text-white transition px-4 z-20"
          >
            ›
          </button>
        </div>
      </div>
    );
  }

  // Vista 2: Álbum con animación
  const selected = collections.find((c) => c.id === activeCollection);

  return (
    <div className="mt-10 animate-open">
      <button
        onClick={() => setActiveCollection(null)}
        className="
    mb-6 flex items-center gap-2 px-4 py-2
    text-sm font-medium
    text-white/80 hover:text-white
    bg-white/5 hover:bg-white/10
    border border-white/10 hover:border-white/20
    rounded-xl backdrop-blur-md
    transition-all duration-300
    hover:scale-[1.03] hover:shadow-lg
  "
      >
        <span className="material-symbols-rounded text-xl">arrow_back</span>
        Volver
      </button>

      <h2 className="text-3xl font-bold mb-6">{selected.title}</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-6 py-10">
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
              secret={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}