import { UserDAL } from './dal';
import { User, PublicUser } from './types';

export class UserService {
  private dal = new UserDAL();

  async getAllUsers(): Promise<PublicUser[]> {
    return this.dal.getAllUsers();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.dal.getUserById(id);
  }

  async findUsersByName(name: string): Promise<PublicUser[]> {
    return this.dal.findUsersByName(name);
  }

  async createUser(data: Omit<User, 'id'>): Promise<User> {
    return this.dal.createUser(data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.dal.updateUser(id, data);
  }

  async deleteUser(id: string): Promise<User> {
    return this.dal.deleteUser(id);
  }

  // מיועד ל-auth בלבד
  async getUserByPhone(phone: string): Promise<User | null> {
    return this.dal.getUserByPhone(phone);
  }
}
