import db from '../../utils/db-conn';
import { Category } from './types';

export class CategoryDAL {
  async getAllCategories(): Promise<Category[]> {
    return db.prisma.category.findMany();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return db.prisma.category.findUnique({
      where: { id }
    });
  }

  async createCategory(data: { name: string }): Promise<Category> {
    return db.prisma.category.create({
      data,
    });
  }


  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    return db.prisma.category.update({
      where: { id },
      data: category
    });
  }

  async deleteCategory(id: number): Promise<Category> {
    return db.prisma.category.delete({
      where: { id }
    });
  }
}
