import db from '../../utils/db-conn';
import { User } from '@prisma/client';

export class UserDAL {
  async getAllUsers(): Promise<User[]> {
    return db.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    return db.prisma.user.findUnique({ where: { id } });
  }

  async findUsersByName(name: string): Promise<User[]> {
    return db.prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async createUser(data: Omit<User, 'id'>): Promise<User> {
    return db.prisma.user.create({ data });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return db.prisma.user.update({ where: { id }, data });
  }

  async getUserByPhone(phone: string): Promise<User | null> {
    return db.prisma.user.findUnique({ where: { phone } });
  }

  async getUserByPhoneAndName(phone: string, name: string): Promise<User | null> {
    return db.prisma.user.findFirst({
      where: { phone, name },
    });
  }
}
