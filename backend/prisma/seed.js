import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();

 
  const achievements = await prisma.achievement.createMany({
    data: [
      {
        name: 'Primer Libro',
        description: 'Lee tu primer libro',
        type: 'reading',
        category: 'Rata de Biblioteca',
        iconUrl: '/bronce.webp',
        points: 10,
        requirementType: 'books_completed',
        requirementCount: 1,
        rarityPercentage: 45
      },
      {
        name: 'Maratón de Lectura',
        description: 'Lee 10 libros',
        type: 'reading',
        category: 'Rata de Biblioteca',
        iconUrl: '/plata.webp',
        points: 50,
        requirementType: 'books_completed',
        requirementCount: 10,
        rarityPercentage: 12,
        secret: true
      },
      {
        name: 'Dragón o Grifo',
        description: 'Lee Alas de Sangre',
        type: 'reading',
        category: 'Rata de Biblioteca',
        iconUrl: '/sangre.webp',
        points: 50,
        requirementType: 'specific_book',
        requirementValue: 'Alas de Sangre',
        rarityPercentage: 3,
        secret: true
      },
      {
        name: 'Dragón o Guiverno',
        description: 'Lee Alas de Hierro',
        type: 'reading',
        category: 'Rata de Biblioteca',
        iconUrl: '/hierro.webp',
        points: 50,
        requirementType: 'specific_book',
        requirementValue: 'Alas de Hierro',
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
        name: 'Somos Personas',
        description: 'Completa Persona 5 Royale',
        type: 'gaming',
        category: 'Gamer Pro',
        iconUrl: '/persona.png',
        points: 10,
        requirementType: 'specific_game',
        requirementValue: 'Persona 5 Royale',
        rarityPercentage: 52,
        secret: true
      },
      {
        name: 'Tienes toda la cara de Kulu-Ya-Ku',
        description: 'Completa MH:World',
        type: 'gaming',
        category: 'Gamer Pro',
        iconUrl: '/mhw.png',
        points: 10,
        requirementType: 'specific_game',
        requirementValue: 'Monster Hunter World', 
        rarityPercentage: 52,
        secret: true
      },
      {
        name: 'Sabio de todos los Ecos',
        description: 'Completa Jak and Daxter: El Legado de los Precursores',
        type: 'gaming',
        category: 'Gamer Pro',
        iconUrl: '/jak1.webp',
        points: 10,
        requirementType: 'specific_game',
        requirementValue: 'Jak and Daxter: El Legado de los Precursores',  
        rarityPercentage: 52,
        secret: true
      },
      {
        name: 'Leyenda de Villa Refugio',
        description: 'Completa Jak 2',
        type: 'gaming',
        category: 'Gamer Pro',
        iconUrl: '/jak2.webp',
        points: 10,
        requirementType: 'specific_game',
        requirementValue: 'Jak 2',  
        rarityPercentage: 52,
        secret: true
      },
      {
        name: 'Esto no es un juego',
        description: 'Completa Jak 3',
        type: 'gaming',
        category: 'Gamer Pro',
        iconUrl: '/jak3.webp',
        points: 10,
        requirementType: 'specific_game',
        requirementValue: 'Jak 3',  
        rarityPercentage: 52,
        secret: true
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
      {
        name: 'Lector Voraz',
        description: 'Lee 5 libros del mismo autor',
        type: 'reading',
        category: 'Rata de Biblioteca',
        iconUrl: '/plata.webp',
        points: 75,
        requirementType: 'same_author',
        requirementCount: 5,
        rarityPercentage: 8,
        secret: true
      },
      {
        name: 'Alomancia',
        description: 'Lee El Imperio Final',
        type: 'reading',
        category: 'Rata de Biblioteca',
        iconUrl: '/sangre.webp',
        points: 50,
        requirementType: 'specific_book',
        requirementValue: 'El Imperio Final',
        rarityPercentage: 3,
        secret: true
      },
      {
        name: 'Explorador de Géneros',
        description: 'Lee en todas las categorías',
        type: 'reading',
        category: 'Rata de Biblioteca',
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
    ]
  });

  console.log(`✅ ${achievements.count} logros creados`);
  // Los userAchievements se crean solos via checkAndUnlock cuando el usuario cumple los requisitos
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());