import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN;

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET as string, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d',
  });
};
