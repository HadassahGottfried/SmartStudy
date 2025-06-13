import { Category } from './types';
import { CategoryDAL } from './dal';

export class CategoryService {
  private dal: CategoryDAL;

  constructor() {
    this.dal = new CategoryDAL();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.dal.getAllCategories();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.dal.getCategoryById(id);
  }

  async createCategory(name: string): Promise<Category> {
    return this.dal.createCategory({ name });
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {


    return this.dal.updateCategory(id, category);
  }

  async deleteCategory(id: number): Promise<Category> {
    return this.dal.deleteCategory(id);
  }
}
