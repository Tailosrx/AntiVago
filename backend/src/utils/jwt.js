import pkg from 'jsonwebtoken';
import config from '../config/environment.js';

const { sign, verify } = pkg;

const generateAccessToken = (userId) => {
  return sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expire
  });
};

const generateRefreshToken = (userId) => {
  return sign({ userId }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpire
  });
};

const verifyAccessToken = (token) => {
  try {
    return verify(token, config.jwt.secret);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return verify(token, config.jwt.refreshSecret);
  } catch (error) {
    return null;
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
