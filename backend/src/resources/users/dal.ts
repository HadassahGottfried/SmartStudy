import db from '../../utils/db-conn';
import { User } from './types';

export class UserDAL {
  async getAllUsers(): Promise<User[]> {
    return db.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    return db.prisma.user.findUnique({
      where: { id }
    });
  }

  async createUser(user: User): Promise<User> {
    return db.prisma.user.create({
      data: user
    });
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return db.prisma.user.update({
      where: { id },
      data: user
    });
  }

  async deleteUser(id: string): Promise<User> {
    return db.prisma.user.delete({
      where: { id }
    });
  }
}
