import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar logros anteriores
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();

  // Crear logros
  const achievements = await prisma.achievement.createMany({
    data: [
      {
        name: 'Primer Libro',
        description: 'Completa tu primer libro',
        type: 'reading',
        category: 'Lector Ávido',
        iconUrl: '/bronce.webp',
        points: 10,
        requirementType: 'books_completed',
        requirementCount: 1,
        rarityPercentage: 45
      },
      {
        name: 'Maratón de Lectura',
        description: 'Completa 10 libros',
        type: 'reading',
        category: 'Lector Ávido',
        iconUrl: '/plata.webp',
        points: 50,
        requirementType: 'books_completed',
        requirementCount: 10,
        rarityPercentage: 12,
        secret: true
      },
      {
        name: 'Bibliófilo',
        description: 'Completa 25 libros',
        type: 'reading',
        category: 'Lector Ávido',
        iconUrl: '/oro.webp',
        points: 100,
        requirementType: 'books_completed',
        requirementCount: 25,
        rarityPercentage: 3,
        secret: true
      },
      {
        name: 'Primer Juego',
        description: 'Completa tu primer juego',
        type: 'gaming',
        category: 'Gamer Pro',
        iconUrl: '/bronce.webp',
        points: 10,
        requirementType: 'games_completed',
        requirementCount: 1,
        rarityPercentage: 52
      },
      {
        name: 'Primer Anime',
        description: 'Completa tu primer anime',
        type: 'anime',
        category: 'Otaku Certificado',
        iconUrl: '/bronce.webp',
        points: 10,
        requirementType: 'anime_completed',
        requirementCount: 1,
        rarityPercentage: 65
      },
        // ✅ NUEVOS LOGROS
    {
      name: 'Lector Voraz',
      description: 'Lee 5 libros del mismo autor',
      type: 'reading',
      category: 'Lector Ávido',
      iconUrl: '/plata.webp',
      points: 75,
      requirementType: 'same_author',
      requirementCount: 5,
      rarityPercentage: 8,
      secret: true
    },
    {
      name: 'Explorador de Géneros',
      description: 'Lee en todas las categorías',
      type: 'reading',
      category: 'Lector Ávido',
      iconUrl: '/oro.webp',
      points: 60,
      requirementType: 'all_categories',
      requirementCount: 7,
      rarityPercentage: 15,
      secret: true
    },
    {
      name: 'Crítico de Cine',
      description: 'Ve 5 animes diferentes',
      type: 'anime',
      category: 'Otaku Certificado',
      iconUrl: '/plata.webp',
      points: 40,
      requirementType: 'anime_completed',
      requirementCount: 5,
      rarityPercentage: 35,
      secret: true
    },
    {
      name: 'Streaker',
      description: 'Mantén una racha de 7 días',
      type: 'general',
      category: 'General',
      iconUrl: '/bronce.webp',
      points: 100,
      requirementType: 'streak_7_days',
      requirementCount: 7,
      rarityPercentage: 5
    },
    {
      name: 'Maestra de la Lectura',
      description: 'Lee 100 libros en total',
      type: 'reading',
      category: 'Lector Ávido',
      iconUrl: '/oro.webp',
      points: 500,
      requirementType: 'books_completed',
      requirementCount: 100,
      rarityPercentage: 0.5,
      secret: true
    }
    ]
  });

  console.log(`✅ ${achievements.count} logros creados`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());