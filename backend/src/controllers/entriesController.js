import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { generateAchievementsForEntry } from "../services/achievementService.js";



// CREATE: Crear lectura
const createReading = async (req, res, next) => {
  try {
    const { title, author, category, rating, status, review, photo } = req.body;
    const userId = req.userId;

    // Convertir números correctamente
    const totalPages = req.body.totalPages ? parseInt(req.body.totalPages) : null;
    const currentPage = req.body.currentPage ? parseInt(req.body.currentPage) : 0;

    if (!title || !category) {
      return res.status(400).json({ error: 'Título y categoría son requeridos' });
    }

    // Estimar total de páginas si no se proporciona
    let estimatedPages = totalPages || estimatePages(title, author);

    const entry = await prisma.readingEntry.create({
      data: {
        userId,
        type: 'libro',
        title,
        author,
        category,
        rating: rating ? parseInt(rating) : null,
        status: status || 'reading',
        review,
        photo: photo || null,
        totalPages: estimatedPages,
        currentPage: currentPage,
        progressPercentage: estimatedPages
          ? Math.round((currentPage / estimatedPages) * 100)
          : 0,
        startedAt: new Date(),
        lastUpdatedPage: new Date()
      }
    });

    try {
      const aiAchievements = await generateAchievementsForEntry({
        type: 'libro',
        title,
        author,
        category
      });

      // Crear los trofeos en la BD
      for (const achievement of aiAchievements) {
        await prisma.achievement.create({
          data: {
            name: achievement.name,
            description: achievement.description,
            type: 'reading',
            category: 'Rata de Biblioteca',
            iconUrl: achievement.emoji || '📖',
            points: achievement.points || 25,
            requirementType: 'specific_book',
            requirementValue: title,
            rarityPercentage: achievement.rarityPercentage || 20,
            secret: true
          }
        });
      }
      console.log(`✅ Trofeos creados para: ${title}`);
    } catch (err) {
      console.log('⚠️ No se pudo generar trofeos, continuando sin ellos...');
    }

    await updateUserCollection(userId, 'reading');
    await verifyAndUnlockAchievements(userId);


    res.status(201).json({
      message: 'Lectura creada',
      entry: {
        ...entry,
        estimatedCompletionDays: estimateCompletionDays(entry.totalPages, entry.currentPage)
      }
    });
  } catch (error) {
    console.error('Error en createReading:', error);
    next(error);
  }
};


const updateReading = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, author, category, rating, status, review, currentPage } = req.body;

    const reading = await prisma.readingEntry.findUnique({
      where: { id }
    });

    if (!reading) {
      return res.status(404).json({ error: 'Lectura no encontrada' });
    }

    if (reading.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a esta lectura' });
    }

    // Si se actualiza la página actual, calcular progreso
    let progressPercentage = reading.progressPercentage;
    if (currentPage !== undefined && reading.totalPages) {
      progressPercentage = Math.round((currentPage / reading.totalPages) * 100);
    }

    const updated = await prisma.readingEntry.update({
      where: { id },
      data: {
        title: title || reading.title,
        author: author || reading.author,
        category: category || reading.category,
        rating: rating ? parseInt(rating) : reading.rating,
        status: status || reading.status,
        review: review !== undefined ? review : reading.review,
        currentPage: currentPage !== undefined ? currentPage : reading.currentPage,
        progressPercentage: progressPercentage,
        finishedAt: status === 'completed' ? new Date() : reading.finishedAt,
        lastUpdatedPage: currentPage !== undefined ? new Date() : reading.lastUpdatedPage
      }
    });

    await verifyAndUnlockAchievements(userId);



    res.json({
      message: 'Lectura actualizada',
      entry: {
        ...updated,
        estimatedCompletionDays: estimateCompletionDays(updated.totalPages, updated.currentPage)
      }
    });
  } catch (error) {
    console.error('Error en updateReading:', error);
    next(error);
  }
};

// GET: Obtener mis lecturas
const getMyReadings = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { category, status } = req.query;

    const where = { userId };
    if (category) where.category = category;
    if (status) where.status = status;

    const readings = await prisma.readingEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      count: readings.length,
      readings
    });
  } catch (error) {
    console.error('Error en getMyReadings:', error);
    next(error);
  }
};

// GET ONE: Obtener una lectura específica
const getReading = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const reading = await prisma.readingEntry.findUnique({
      where: { id }
    });

    if (!reading) {
      return res.status(404).json({ error: 'Lectura no encontrada' });
    }

    if (reading.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a esta lectura' });
    }

    res.json(reading);
  } catch (error) {
    console.error('Error en getReading:', error);
    next(error);
  }
};


// DELETE: Eliminar lectura
const deleteReading = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const reading = await prisma.readingEntry.findUnique({
      where: { id }
    });

    if (!reading) {
      return res.status(404).json({ error: 'Lectura no encontrada' });
    }

    if (reading.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a esta lectura' });
    }

    await prisma.readingEntry.delete({
      where: { id }
    });

    res.json({ message: 'Lectura eliminada' });
  } catch (error) {
    console.error('Error en deleteReading:', error);
    next(error);
  }
};

// ===== GAME ENTRIES =====

// CREATE: Crear juego
const createGame = async (req, res, next) => {
  try {
    const { title, category, platform, rating, status, review, hoursPlayed, photo } = req.body;
    const userId = req.userId;

    if (!title || !category) {
      return res.status(400).json({ error: 'Título y categoría son requeridos' });
    }

    const entry = await prisma.gameEntry.create({
      data: {
        userId,
        title,
        category,
        platform,
        rating: rating ? parseInt(rating) : null,
        status: status || 'playing',
        review,
        hoursPlayed: hoursPlayed ? parseInt(hoursPlayed) : 0,
        photo: photo || null,
        startedAt: new Date()
      }
    });

     try {
      const aiAchievements = await generateAchievementsForEntry({
        type: 'libro',
        title,
        author,
        category
      });

      // Crear los trofeos en la BD
      for (const achievement of aiAchievements) {
        await prisma.achievement.create({
          data: {
            name: achievement.name,
            description: achievement.description,
            type: 'reading',
            category: 'Rata de Biblioteca',
            iconUrl: achievement.emoji || '📖',
            points: achievement.points || 25,
            requirementType: 'specific_book',
            requirementValue: title,
            rarityPercentage: achievement.rarityPercentage || 20,
            secret: true
          }
        });
      }
      console.log(`✅ Trofeos creados para: ${title}`);
    } catch (err) {
      console.log('⚠️ No se pudo generar trofeos, continuando sin ellos...');
    }

    try {
      const aiAchievements = await generateAchievementsForEntry({
        type: 'juego',
        title,
        category,
        platform
      });

      for (const achievement of aiAchievements) {
        await prisma.achievement.create({
          data: {
            name: achievement.name,
            description: achievement.description,
            type: 'gaming',
            category: 'Gamer Pro',
            iconUrl: achievement.emoji || '🎮',
            points: achievement.points || 25,
            requirementType: 'specific_game',
            requirementValue: title,
            rarityPercentage: achievement.rarityPercentage || 20,
            secret: true
          }
        });
      }
    } catch (err) {
      console.log('⚠️ No se pudo generar trofeos para el juego');
    }

    await updateUserCollection(userId, 'game');

    res.status(201).json({
      message: 'Juego creado',
      entry
    });
  } catch (error) {
    console.error('Error en createGame:', error);
    next(error);
  }
};

// GET: Obtener mis juegos
const getMyGames = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { category, platform, status } = req.query;

    const where = { userId };
    if (category) where.category = category;
    if (platform) where.platform = platform;
    if (status) where.status = status;

    const games = await prisma.gameEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      count: games.length,
      games
    });
  } catch (error) {
    console.error('Error en getMyGames:', error);
    next(error);
  }
};

// GET ONE: Obtener un juego específico
const getGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const game = await prisma.gameEntry.findUnique({
      where: { id }
    });

    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    if (game.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este juego' });
    }

    res.json(game);
  } catch (error) {
    console.error('Error en getGame:', error);
    next(error);
  }
};

// UPDATE: Actualizar juego
const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, category, platform, rating, status, review, hoursPlayed } = req.body;

    const game = await prisma.gameEntry.findUnique({
      where: { id }
    });

    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    if (game.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este juego' });
    }

    const updated = await prisma.gameEntry.update({
      where: { id },
      data: {
        title: title || game.title,
        category: category || game.category,
        platform: platform || game.platform,
        rating: rating ? parseInt(rating) : game.rating,
        status: status || game.status,
        review: review !== undefined ? review : game.review,
        hoursPlayed: hoursPlayed ? parseInt(hoursPlayed) : game.hoursPlayed,
        completedAt: status === 'completed' ? new Date() : game.completedAt
      }
    });

    await verifyAndUnlockAchievements(userId);


    res.json({
      message: 'Juego actualizado',
      entry: updated
    });
  } catch (error) {
    console.error('Error en updateGame:', error);
    next(error);
  }
};

// DELETE: Eliminar juego
const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const game = await prisma.gameEntry.findUnique({
      where: { id }
    });

    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    if (game.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este juego' });
    }

    await prisma.gameEntry.delete({
      where: { id }
    });

    res.json({ message: 'Juego eliminado' });
  } catch (error) {
    console.error('Error en deleteGame:', error);
    next(error);
  }
};

// ===== ANIME ENTRIES =====

// CREATE: Crear anime
const createAnime = async (req, res, next) => {
  try {
    const { title, episodes, rating, status, review} = req.body;
    const userId = req.userId;

    if (!title) {
      return res.status(400).json({ error: 'Título es requerido' });
    }

    const entry = await prisma.animeEntry.create({
      data: {
        userId,
        title,
        episodes: episodes ? parseInt(episodes) : 0,
        rating: rating ? parseInt(rating) : null,
        status: status || 'watching',
        review,
        startedAt: new Date()
      }
    });

    

    await updateUserCollection(userId, 'anime');

    res.status(201).json({
      message: 'Anime creado',
      entry
    });
  } catch (error) {
    console.error('Error en createAnime:', error);
    next(error);
  }
};

// GET: Obtener mis animes
const getMyAnimes = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { status } = req.query;

    const where = { userId };
    if (status) where.status = status;

    const animes = await prisma.animeEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      count: animes.length,
      animes
    });
  } catch (error) {
    console.error('Error en getMyAnimes:', error);
    next(error);
  }
};

// GET ONE: Obtener un anime específico
const getAnime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const anime = await prisma.animeEntry.findUnique({
      where: { id }
    });

    if (!anime) {
      return res.status(404).json({ error: 'Anime no encontrado' });
    }

    if (anime.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este anime' });
    }

    res.json(anime);
  } catch (error) {
    console.error('Error en getAnime:', error);
    next(error);
  }
};

// UPDATE: Actualizar anime
const updateAnime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, episodes, rating, status, review} = req.body;

    const anime = await prisma.animeEntry.findUnique({
      where: { id }
    });

    if (!anime) {
      return res.status(404).json({ error: 'Anime no encontrado' });
    }

    if (anime.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este anime' });
    }

    const updated = await prisma.animeEntry.update({
      where: { id },
      data: {
        title: title || anime.title,
        episodes: episodes ? parseInt(episodes) : anime.episodes,
        rating: rating ? parseInt(rating) : anime.rating,
        status: status || anime.status,
        review: review !== undefined ? review : anime.review,
        completedAt: status === 'completed' ? new Date() : anime.completedAt
      }
    });

    await verifyAndUnlockAchievements(userId);


    res.json({
      message: 'Anime actualizado',
      entry: updated
    });
  } catch (error) {
    console.error('Error en updateAnime:', error);
    next(error);
  }
};

// DELETE: Eliminar anime
const deleteAnime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const anime = await prisma.animeEntry.findUnique({
      where: { id }
    });

    if (!anime) {
      return res.status(404).json({ error: 'Anime no encontrado' });
    }

    if (anime.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este anime' });
    }

    await prisma.animeEntry.delete({
      where: { id }
    });

    res.json({ message: 'Anime eliminado' });
  } catch (error) {
    console.error('Error en deleteAnime:', error);
    next(error);
  }
};

// ===== HELPER FUNCTIONS =====

// Actualizar colección de usuario
const updateUserCollection = async (userId, type) => {
  try {
    const collection = await prisma.userCollection.findUnique({
      where: { userId }
    });

    if (!collection) {
      await prisma.userCollection.create({
        data: { userId }
      });
    }

    // Contar totales
    const totalBooks = await prisma.readingEntry.count({
      where: { userId, status: 'completed' }
    });

    const totalGames = await prisma.gameEntry.count({
      where: { userId, status: 'completed' }
    });

    const totalAnime = await prisma.animeEntry.count({
      where: { userId, status: 'completed' }
    });

    const totalHours = await prisma.gameEntry.aggregate({
      where: { userId },
      _sum: { hoursPlayed: true }
    });

    // Calcular stage
    const total = totalBooks + totalGames + totalAnime;
    let stage = 1;
    if (total >= 50) stage = 5;
    else if (total >= 21) stage = 4;
    else if (total >= 11) stage = 3;
    else if (total >= 6) stage = 2;

    const stageVisuals = {
      1: 'novice',
      2: 'enthusiast',
      3: 'expert',
      4: 'legend',
      5: 'immortal'
    };

    // Actualizar collection
    await prisma.userCollection.update({
      where: { userId },
      data: {
        totalBooks,
        totalGames,
        totalAnime,
        totalHours: totalHours._sum.hoursPlayed || 0,
        currentStage: stage,
        stageVisual: stageVisuals[stage]
      }
    });
  } catch (error) {
    console.error('Error actualizando colección:', error);
  }
};



// ===== UNIFIED ENTRY UPDATE =====
const updateEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    let data = req.body;

    // 1. Buscar en Reading
    let entry = await prisma.readingEntry.findUnique({ where: { id } });
    if (entry) {
      if (entry.userId !== userId) return res.status(403).json({ error: "No autorizado" });

      const allowed = {
        ...(data.status !== undefined && { status: data.status }),
        ...(data.review !== undefined && { review: data.review }),
        ...(data.currentPage !== undefined && { currentPage: data.currentPage }),
      };

      const updated = await prisma.readingEntry.update({ where: { id }, data: allowed });
      await verifyAndUnlockAchievements(userId); // ✅
      return res.json({ entry: updated });
    }

    // 2. Buscar en Game
    entry = await prisma.gameEntry.findUnique({ where: { id } });
    if (entry) {
      if (entry.userId !== userId) return res.status(403).json({ error: "No autorizado" });

      const allowed = {
        ...(data.status !== undefined && { status: data.status }),
        ...(data.review !== undefined && { review: data.review }),
        ...(data.hoursPlayed !== undefined && { hoursPlayed: data.hoursPlayed }),
      };

      const updated = await prisma.gameEntry.update({ where: { id }, data: allowed });
      await verifyAndUnlockAchievements(userId); // ✅
      return res.json({ entry: updated });
    }

    // 3. Buscar en Anime
    entry = await prisma.animeEntry.findUnique({ where: { id } });
    if (entry) {
      if (entry.userId !== userId) return res.status(403).json({ error: "No autorizado" });

      const allowed = {
        ...(data.status !== undefined && { status: data.status }),
        ...(data.review !== undefined && { review: data.review }),
        ...(data.episodes !== undefined && { episodes: data.episodes }),
      };

      const updated = await prisma.animeEntry.update({ where: { id }, data: allowed });
      await verifyAndUnlockAchievements(userId); // ✅
      return res.json({ entry: updated });
    }

    return res.status(404).json({ error: "Entrada no encontrada" });

  } catch (error) {
    console.error("Error en updateEntry:", error);
    next(error);
  }
};



// ===== UNIFIED GET ALL ENTRIES =====
const getAllEntries = async (req, res, next) => {
  try {
    const userId = req.userId;

    const [readings, games, animes] = await Promise.all([
      prisma.readingEntry.findMany({ where: { userId } }),
      prisma.gameEntry.findMany({ where: { userId } }),
      prisma.animeEntry.findMany({ where: { userId } }),
    ]);

    res.json({
      readings,
      games,
      animes
    });

  } catch (error) {
    console.error("Error en getAllEntries:", error);
    next(error);
  }
};


const estimatePages = (title, author) => {
  const bookLengths = {
    'harry potter': 300,
    'el conde de montecristo': 460,
    'cien años de soledad': 417,
    'el hobbit': 310,
    'don quijote': 863,
    '1984': 328,
    'orgullo y prejuicio': 279,
    'el principito': 95,
    'el señor de los anillos': 1000,
    'dune': 688,
  };

  const lowerTitle = title.toLowerCase();
  for (const [book, pages] of Object.entries(bookLengths)) {
    if (lowerTitle.includes(book)) {
      return pages;
    }
  }

  // Estimación por defecto (promedio: 300 páginas)
  return 300;
};

// Calcular días estimados para completar
const estimateCompletionDays = (totalPages, currentPage) => {
  if (!totalPages || totalPages === 0) return null;

  const pagesRemaining = totalPages - (currentPage || 0);
  const pagesPerDay = 30; // Promedio de páginas/día
  const daysRemaining = Math.ceil(pagesRemaining / pagesPerDay);

  return daysRemaining > 0 ? daysRemaining : 0;
};

// ✅ Helper para verificar logros
const verifyAndUnlockAchievements = async (userId) => {
  try {
    const booksCompleted = await prisma.readingEntry.count({
      where: { userId, status: 'completed' }
    });

    const gamesCompleted = await prisma.gameEntry.count({
      where: { userId, status: 'completed' }
    });

    const animeCompleted = await prisma.animeEntry.count({
      where: { userId, status: 'completed' }
    });

    const allAchievements = await prisma.achievement.findMany();

    for (const achievement of allAchievements) {
      let shouldUnlock = false;

      if (achievement.requirementType === 'books_completed') {
        shouldUnlock = booksCompleted >= achievement.requirementCount;
      } else if (achievement.requirementType === 'games_completed') {
        shouldUnlock = gamesCompleted >= achievement.requirementCount;
      } else if (achievement.requirementType === 'anime_completed') {
        shouldUnlock = animeCompleted >= achievement.requirementCount;
      } // 📚 Logro por libro específico
      else if (achievement.requirementType === 'specific_book') {
        const exists = await prisma.readingEntry.findFirst({
          where: {
            userId,
            status: 'completed',
            title: achievement.requirementValue
          }
        });
      
        shouldUnlock = !!exists;
      } else if (achievement.requirementType === 'specific_game') {
        const exists = await prisma.gameEntry.findFirst({
          where: {
            userId,
            status: 'completed',
            title: achievement.requirementValue
          }
        });
        shouldUnlock = !!exists;
      }
      

      if (shouldUnlock) {
        const exists = await prisma.userAchievement.findUnique({
          where: {
            userId_achievementId: { userId, achievementId: achievement.id }
          }
        });

        if (!exists) {
          await prisma.userAchievement.create({
            data: {
              userId,
              achievementId: achievement.id,
              unlockedAt: new Date()
            }
          });

          await prisma.user.update({
            where: { id: userId },
            data: { points: { increment: achievement.points } }
          });
        }
      }
    }
  } catch (err) {
    console.error('Error verificando logros:', err);
  }
};




export default {
  // Reading
  createReading,
  getMyReadings,
  getReading,
  updateReading,
  deleteReading,
  // Game
  createGame,
  getMyGames,
  getGame,
  updateGame,
  deleteGame,
  // Anime
  createAnime,
  getMyAnimes,
  getAnime,
  updateAnime,
  deleteAnime,

  //Todito
  updateEntry,
  getAllEntries,
  estimateCompletionDays,
  estimatePages
};