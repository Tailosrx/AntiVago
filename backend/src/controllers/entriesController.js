const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ===== READING ENTRIES =====

// CREATE: Crear lectura
const createReading = async (req, res, next) => {
  try {
    const { title, author, category, rating, status, review, isFavorite } = req.body;
    const userId = req.userId;

    // Validar
    if (!title || !category) {
      return res.status(400).json({ error: 'Título y categoría son requeridos' });
    }

    // Crear entry
    const entry = await prisma.readingEntry.create({
      data: {
        userId,
        title,
        author,
        category,
        rating: rating ? parseInt(rating) : null,
        status: status || 'reading',
        review,
        isFavorite: isFavorite || false,
        startedAt: new Date()
      }
    });

    // Actualizar colección del usuario
    await updateUserCollection(userId, 'reading');

    res.status(201).json({
      message: 'Lectura creada',
      entry
    });
  } catch (error) {
    console.error('Error en createReading:', error);
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
      where: { id: parseInt(id) }
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

// UPDATE: Actualizar lectura
const updateReading = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, author, category, rating, status, review, isFavorite } = req.body;

    const reading = await prisma.readingEntry.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reading) {
      return res.status(404).json({ error: 'Lectura no encontrada' });
    }

    if (reading.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a esta lectura' });
    }

    const updated = await prisma.readingEntry.update({
      where: { id: parseInt(id) },
      data: {
        title: title || reading.title,
        author: author || reading.author,
        category: category || reading.category,
        rating: rating ? parseInt(rating) : reading.rating,
        status: status || reading.status,
        review: review !== undefined ? review : reading.review,
        isFavorite: isFavorite !== undefined ? isFavorite : reading.isFavorite,
        finishedAt: status === 'completed' ? new Date() : reading.finishedAt
      }
    });

    res.json({
      message: 'Lectura actualizada',
      entry: updated
    });
  } catch (error) {
    console.error('Error en updateReading:', error);
    next(error);
  }
};

// DELETE: Eliminar lectura
const deleteReading = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const reading = await prisma.readingEntry.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reading) {
      return res.status(404).json({ error: 'Lectura no encontrada' });
    }

    if (reading.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a esta lectura' });
    }

    await prisma.readingEntry.delete({
      where: { id: parseInt(id) }
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
    const { title, category, platform, rating, status, review, hoursPlayed, isFavorite } = req.body;
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
        isFavorite: isFavorite || false,
        hoursPlayed: hoursPlayed ? parseInt(hoursPlayed) : 0,
        startedAt: new Date()
      }
    });

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
      where: { id: parseInt(id) }
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
    const { title, category, platform, rating, status, review, hoursPlayed, isFavorite } = req.body;

    const game = await prisma.gameEntry.findUnique({
      where: { id: parseInt(id) }
    });

    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    if (game.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este juego' });
    }

    const updated = await prisma.gameEntry.update({
      where: { id: parseInt(id) },
      data: {
        title: title || game.title,
        category: category || game.category,
        platform: platform || game.platform,
        rating: rating ? parseInt(rating) : game.rating,
        status: status || game.status,
        review: review !== undefined ? review : game.review,
        isFavorite: isFavorite !== undefined ? isFavorite : game.isFavorite,
        hoursPlayed: hoursPlayed ? parseInt(hoursPlayed) : game.hoursPlayed,
        completedAt: status === 'completed' ? new Date() : game.completedAt
      }
    });

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
      where: { id: parseInt(id) }
    });

    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    if (game.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este juego' });
    }

    await prisma.gameEntry.delete({
      where: { id: parseInt(id) }
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
    const { title, episodes, rating, status, review, isFavorite } = req.body;
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
        isFavorite: isFavorite || false,
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
      where: { id: parseInt(id) }
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
    const { title, episodes, rating, status, review, isFavorite } = req.body;

    const anime = await prisma.animeEntry.findUnique({
      where: { id: parseInt(id) }
    });

    if (!anime) {
      return res.status(404).json({ error: 'Anime no encontrado' });
    }

    if (anime.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este anime' });
    }

    const updated = await prisma.animeEntry.update({
      where: { id: parseInt(id) },
      data: {
        title: title || anime.title,
        episodes: episodes ? parseInt(episodes) : anime.episodes,
        rating: rating ? parseInt(rating) : anime.rating,
        status: status || anime.status,
        review: review !== undefined ? review : anime.review,
        isFavorite: isFavorite !== undefined ? isFavorite : anime.isFavorite,
        completedAt: status === 'completed' ? new Date() : anime.completedAt
      }
    });

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
      where: { id: parseInt(id) }
    });

    if (!anime) {
      return res.status(404).json({ error: 'Anime no encontrado' });
    }

    if (anime.userId !== userId) {
      return res.status(403).json({ error: 'No tienes acceso a este anime' });
    }

    await prisma.animeEntry.delete({
      where: { id: parseInt(id) }
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

module.exports = {
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
  deleteAnime
};