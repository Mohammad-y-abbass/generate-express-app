import { UserType } from '../types/auth.types';
import ConflictError from '../../../errorHandlers/ConflictError';
import hashPassword from '../utils/hashPassword';
import { prisma } from '../../../db/config';
import NotFoundError from '../../../errorHandlers/NotFoundError';
import bcrypt from 'bcrypt';
import InvalidCredentialsError from '../../../errorHandlers/invalidCredentialsError';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

class AuthService {
  async signup(user: UserType) {
    const { email, password } = user;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) throw new ConflictError('User already exists');

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async signin(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundError('User does not exist');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new InvalidCredentialsError('Invalid credentials');

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }
}

export default new AuthService();
