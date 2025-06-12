import { SubCategory as PrismaSubCategory } from '@prisma/client';
import { SubCategoryDAL } from './dal';

export class SubCategoryService {
  private dal = new SubCategoryDAL();

  async getAll(): Promise<PrismaSubCategory[]> {
    return this.dal.getAllSubCategories();
  }

  async getById(id: number): Promise<PrismaSubCategory | null> {
    return this.dal.getSubCategoryById(id);
  }

  async create(data: { name: string; category_id: number | string }): Promise<PrismaSubCategory> {
    const { name } = data;
    const category_id = Number(data.category_id);

    if (!name || isNaN(category_id)) {
      throw new Error('Missing required fields');
    }

    return this.dal.createSubCategory({ name, category_id });
  }

  async update(id: number, data: Partial<PrismaSubCategory>): Promise<PrismaSubCategory> {
    return this.dal.updateSubCategory(id, data);
  }

  async delete(id: number): Promise<PrismaSubCategory> {
    return this.dal.deleteSubCategory(id);
  }
}
