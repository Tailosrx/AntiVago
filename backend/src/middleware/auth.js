import jwt from '../utils/jwt.js';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    console.log("AUTH HEADER:", req.headers.authorization);


    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    res.status(401).json({ error: 'Error de autenticación' });
  }
};

export default authMiddleware;
