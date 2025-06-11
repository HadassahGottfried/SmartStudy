import db from '../../utils/db-conn';
import { User as PrismaUser } from '@prisma/client';
import { PublicUser } from './types';

export class UserDAL {
  async getAllUsers(): Promise<PublicUser[]> {
    return db.prisma.user.findMany({
      select: { id: true, name: true, phone: true }
    });
  }

  async getUserById(id: string): Promise<PrismaUser | null> {
    return db.prisma.user.findUnique({ where: { id } });
  }

  async findUsersByName(name: string): Promise<PublicUser[]> {
    return db.prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      },
      select: { id: true, name: true, phone: true }
    });
  }

  // ✅ נכון - גרסה חדשה
async createUser(data: { name: string; phone: string }): Promise<PrismaUser> {
  return db.prisma.user.create({ data });
}


  async updateUser(id: string, data: Partial<PrismaUser>): Promise<PrismaUser> {
    return db.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<PrismaUser> {
    return db.prisma.user.delete({ where: { id } });
  }

  async getUserByPhone(phone: string): Promise<PrismaUser | null> {
    return db.prisma.user.findUnique({ where: { phone } });
  }

  async getUserByPhoneAndName(phone: string, name: string): Promise<PrismaUser | null> {
    return db.prisma.user.findFirst({
      where: { phone, name }
    });
  }
}
