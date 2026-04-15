import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET: Obtener definiciones de logros
const getAchievementDefinitions = async (req, res, next) => {
  try {
    const achievements = await prisma.achievement.findMany();
    res.json(achievements);
  } catch (error) {
    console.error("Error en getAchievementDefinitions:", error);
    next(error);
  }
};

// GET: Obtener mis logros
const getMyAchievements = async (req, res, next) => {
  try {
    const userId = req.userId;

    const allAchievements = await prisma.achievement.findMany();

    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    });

    // ✅ Así debe quedar
    const achievementsWithStatus = allAchievements.map((achievement) => {
      const userAchievement = userAchievements.find(
        (ua) => ua.achievementId === achievement.id
      );
      return {
        ...achievement,
        unlocked: !!userAchievement, // true solo si existe el registro
        unlockedAt: userAchievement?.unlockedAt || null, // null si no está desbloqueado
        progress: userAchievement?.progress || 0,
      };
    });

    res.json(achievementsWithStatus);
  } catch (error) {
    console.error("Error en getMyAchievements:", error);
    next(error);
  }
};

// GET: Obtener progreso de logros
const getAchievementProgress = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Contar por categoría
    const readingCount = await prisma.readingEntry.count({
      where: { userId, status: "completed" },
    });

    const gamingCount = await prisma.gameEntry.count({
      where: { userId, status: "completed" },
    });

    const animeCount = await prisma.animeEntry.count({
      where: { userId, status: "completed" },
    });

    const totalHours = await prisma.gameEntry.aggregate({
      where: { userId },
      _sum: { hoursPlayed: true },
    });

    res.json({
      reading: readingCount,
      gaming: gamingCount,
      anime: animeCount,
      totalHours: totalHours._sum.hoursPlayed || 0,
    });
  } catch (error) {
    console.error("Error en getAchievementProgress:", error);
    next(error);
  }
};

// POST: Verificar y desbloquear logros automáticamente
const checkAndUnlock = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Obtener datos del usuario
    const booksCompleted = await prisma.readingEntry.count({
      where: { userId, status: "completed" },
    });

    const gamesCompleted = await prisma.gameEntry.count({
      where: { userId, status: "completed" },
    });

    const animeCompleted = await prisma.animeEntry.count({
      where: { userId, status: "completed" },
    });

    const totalHours = await prisma.gameEntry.aggregate({
      where: { userId },
      _sum: { hoursPlayed: true },
    });

    // Obtener todos los logros
    const allAchievements = await prisma.achievement.findMany();
    const unlockedAchievements = [];

    // Verificar cada logro
    for (const achievement of allAchievements) {
      let shouldUnlock = false;

      if (achievement.requirementType === "books_completed") {
        shouldUnlock = booksCompleted >= achievement.requirementCount;
      } else if (achievement.requirementType === "games_completed") {
        shouldUnlock = gamesCompleted >= achievement.requirementCount;
      } else if (achievement.requirementType === "anime_completed") {
        shouldUnlock = animeCompleted >= achievement.requirementCount;
      } else if (achievement.requirementType === "hours_played") {
        shouldUnlock =
          (totalHours._sum.hoursPlayed || 0) >= achievement.requirementCount;
      } else if (achievement.requirementType === "same_author") {
        const authors = await prisma.readingEntry.groupBy({
          by: ["author"],
          where: { userId, status: "completed" },
          _count: { author: true },
        }); 

        shouldUnlock = authors.some(
          (a) => a._count.author >= achievement.requirementCount
        );
      } else if (achievement.requirementType === "all_categories") {
        const categories = await prisma.readingEntry.findMany({
          where: { userId, status: "completed" },
          select: { category: true },
        });

        const unique = new Set(categories.map((c) => c.category));
        shouldUnlock = unique.size >= achievement.requirementCount;
      } else if (achievement.requirementType === "streak_7_days") {
        const streak = await calculateUserStreak(userId);
        shouldUnlock = streak >= achievement.requirementCount;
      } else if (achievement.requirementType === 'specific_book') {
        const book = await prisma.readingEntry.findFirst({
          where: {
            userId,
            status: 'completed',
            title: achievement.requirementValue
          }
        });
        shouldUnlock = !!book;
      } else if (achievement.requirementType === 'specific_game') {
        const game = await prisma.gameEntry.findFirst({
          where: {
            userId,
            status: 'completed',
            title: achievement.requirementValue
          }
        });
        shouldUnlock = !!game;
      } else if (achievement.requirementType === 'specific_anime') {
        const anime = await prisma.animeEntry.findFirst({
          where: {
            userId,
            status: 'completed',
            title: achievement.requirementValue
          }
        });
        shouldUnlock = !!anime;
      }

      if (shouldUnlock) {
        // Verificar si ya está desbloqueado
        const exists = await prisma.userAchievement.findUnique({
          where: {
            userId_achievementId: {
              userId,
              achievementId: achievement.id,
            },
          },
        });

        if (!exists) {
          // Desbloquear
          const newUnlock = await prisma.userAchievement.create({
            data: {
              userId,
              achievementId: achievement.id,
              unlockedAt: new Date(),
            },
          });

          // Sumar puntos al usuario
          await prisma.user.update({
            where: { id: userId },
            data: { points: { increment: achievement.points } },
          });

          unlockedAchievements.push(achievement.name);
        }
      }
    }

    res.json({
      message: "Logros verificados",
      newUnlocked: unlockedAchievements,
      count: unlockedAchievements.length,
    });
  } catch (error) {
    console.error("Error en checkAndUnlock:", error);
    next(error);
  }
};

export default {
  getAchievementDefinitions,
  getMyAchievements,
  getAchievementProgress,
  checkAndUnlock,
};
