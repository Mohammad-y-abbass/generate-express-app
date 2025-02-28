import { PrismaClient } from '@prisma/client';
import * as colors from 'colors';

export const prisma = new PrismaClient();

export async function connectDB() {
  try {
    console.log(colors.blue('🔌 ') + colors.white('Connecting to database...'));
    await prisma.$connect();

    console.log(colors.cyan('┌────────────────────────────────────────────┐'));
    console.log(
      colors.cyan('│ ') +
        colors.green.bold('        DATABASE CONNECTED!          ') +
        colors.cyan(' │')
    );
    console.log(colors.cyan('└────────────────────────────────────────────┘'));

    return true;
  } catch (error) {
    console.log(colors.red('┌────────────────────────────────────────────┐'));
    console.log(
      colors.red('│ ') +
        colors.white.bold('        DATABASE ERROR!               ') +
        colors.red(' │')
    );
    console.log(
      colors.red('│ ') +
        colors.yellow(String(error).substring(0, 38).padEnd(38)) +
        colors.red(' │')
    );
    console.log(colors.red('└────────────────────────────────────────────┘'));

    throw error;
  }
}
