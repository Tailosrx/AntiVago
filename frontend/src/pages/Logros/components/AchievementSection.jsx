import AchievementCard from "./AchievementCard";

const bronze = "/bronce.webp";
const plata = "/plata.webp";
const oro = "/oro.webp";
const platino = "/platino.webp";

export default function AchievementsSection({ readings, games, animes }) {
  const achievements = [
    {
      id: 1,
      title: "Primer libro completado",
      description: "Completa tu primer libro",
      iconSrc: bronze,
      rarity: "bronze",
      secret: false,
      unlocked: readings.filter(r => r.status === "completed").length >= 1
    },
    {
      id: 2,
      title: "Maratón de lectura",
      description: "Completa 10 libros",
      iconSrc: plata,
      rarity: "silver",
      secret: true, // SECRETO
      unlocked: readings.filter(r => r.status === "completed").length >= 10
    },
    {
      id: 3,
      title: "Gamer casual",
      description: "Juega 20 horas en total",
      iconSrc: oro,
      rarity: "gold",
      secret: false,
      unlocked: games.reduce((acc, g) => acc + (g.hoursPlayed || 0), 0) >= 20
    },
    {
      id: 4,
      title: "Otaku en progreso",
      description: "Completa tu primer anime",
      iconSrc: platino,
      rarity: "platinum",
      secret: false,
      unlocked: animes.filter(a => a.status === "completed").length >= 1
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  return (
    <div className="mt-10">

      {/* Barra de progreso */}
      <div className="mb-10">
        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="mt-2 text-white/70 text-sm">
          {unlockedCount} de {totalAchievements} logros desbloqueados
        </p>
      </div>


      {/* Sticker Collection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 py-10">
        {achievements.map(a => (
          <AchievementCard key={a.id} {...a} />
        ))}
      </div>
    </div>
  );
}
