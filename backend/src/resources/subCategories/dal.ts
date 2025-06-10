import db from '../../utils/db-conn';
import { SubCategory } from './types';

export class SubCategoryDAL {
  async getAllSubCategories(): Promise<SubCategory[]> {
    return db.prisma.subCategory.findMany();
  }

  async getSubCategoryById(id: number): Promise<SubCategory | null> {
    return db.prisma.subCategory.findUnique({ where: { id } });
  }

  async createSubCategory(data: SubCategory): Promise<SubCategory> {
    return db.prisma.subCategory.create({ data });
  }

  async updateSubCategory(id: number, data: Partial<SubCategory>): Promise<SubCategory> {
    return db.prisma.subCategory.update({ where: { id }, data });
  }

  async deleteSubCategory(id: number): Promise<SubCategory> {
    return db.prisma.subCategory.delete({ where: { id } });
  }
}
