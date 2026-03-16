import { sign, verify } from 'jsonwebtoken';
import { jwt as _jwt } from '../config/environment';

const generateAccessToken = (userId) => {
  return sign({ userId }, _jwt.secret, {
    expiresIn: _jwt.expire
  });
};

const generateRefreshToken = (userId) => {
  return sign({ userId }, _jwt.refreshSecret, {
    expiresIn: _jwt.refreshExpire
  });
};

const verifyAccessToken = (token) => {
  try {
    return verify(token, _jwt.secret);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return verify(token, _jwt.refreshSecret);
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
