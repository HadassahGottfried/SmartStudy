import { UserDAL } from './dal';
import { User as PrismaUser } from '@prisma/client';

export class UserService {
  private dal = new UserDAL();

  async getAllUsers() {
    return this.dal.getAllUsers();
  }

  async getUserById(id: string) {
    return this.dal.getUserById(id);
  }

  async findUsersByName(name: string) {
    return this.dal.findUsersByName(name);
  }

  async registerUser(data: { name: string; phone: string }) {
  return this.dal.createUser(data);
}


  async updateUser(id: string, data: Partial<PrismaUser>) {
    return this.dal.updateUser(id, data);
  }

  async getUserByPhone(phone: string) {
    return this.dal.getUserByPhone(phone);
  }

  async getUserByPhoneAndName(phone: string, name: string) {
    return this.dal.getUserByPhoneAndName(phone, name);
  }
}
