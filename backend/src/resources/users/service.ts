import { User } from './types';
import { UserDAL } from './dal';

export class UserService {
  private dal = new UserDAL();

  async getAllUsers(): Promise<User[]> {
    return this.dal.getAllUsers();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.dal.getUserById(id);
  }

  async createUser(user: User): Promise<User> {
    return this.dal.createUser(user);
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return this.dal.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<User> {
    return this.dal.deleteUser(id);
  }
}
