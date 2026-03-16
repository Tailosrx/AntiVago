import bcryptjs from 'bcryptjs';
import pkg from '@prisma/client';
import jwt from '../utils/jwt.js';
const { PrismaClient } = pkg;
const  prisma = new PrismaClient();
const {generateAccessToken, generateRefreshToken} = jwt;

// REGISTER: Crear nuevo usuario
const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    // Validar entrada
    if (!email || !password || !username) {
      return res.status(400).json({ 
        error: 'Email, password y username son requeridos' 
      });
    }

    // Verificar si usuario ya existe
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'Email o username ya existen' 
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      }
    });

    // Crear colección vacía para usuario
    await prisma.userCollection.create({
      data: {
        userId: user.id
      }
    });

    // Generar tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Responder
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Error en register:', error);
    next(error);
  }
};

// LOGIN: Autenticar usuario
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar entrada
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y password son requeridos' 
      });
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    // Verificar password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    // Generar tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Responder
    res.json({
      message: 'Login exitoso',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    next(error);
  }
};

// GET ME: Obtener usuario actual
const getMe = async (req, res, next) => {
  try {
    const userId = req.userId; // Del middleware auth

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        level: true,
        points: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ 
        error: 'Usuario no encontrado' 
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Error en getMe:', error);
    next(error);
  }
};

// REFRESH TOKEN: Renovar access token
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({ 
        error: 'Refresh token requerido' 
      });
    }

    const { verifyRefreshToken } = require('../utils/jwt');
    const decoded = verifyRefreshToken(token);

    if (!decoded) {
      return res.status(401).json({ 
        error: 'Refresh token inválido' 
      });
    }

    // Generar nuevo access token
    const newAccessToken = generateAccessToken(decoded.userId);

    res.json({
      accessToken: newAccessToken
    });
  } catch (error) {
    console.error('Error en refreshToken:', error);
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
  refreshToken
};