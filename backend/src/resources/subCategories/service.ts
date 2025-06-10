import { SubCategory } from './types';
import { SubCategoryDAL } from './dal';

export class SubCategoryService {
  private dal = new SubCategoryDAL();

  async getAll(): Promise<SubCategory[]> {
    return this.dal.getAllSubCategories();
  }

  async getById(id: number): Promise<SubCategory | null> {
    return this.dal.getSubCategoryById(id);
  }

  async create(data: SubCategory): Promise<SubCategory> {
    if (!data.name || !data.categoryId) {
      throw new Error('Missing required fields');
    }
    return this.dal.createSubCategory(data);
  }

  async update(id: number, data: Partial<SubCategory>): Promise<SubCategory> {
    return this.dal.updateSubCategory(id, data);
  }

  async delete(id: number): Promise<SubCategory> {
    return this.dal.deleteSubCategory(id);
  }
}
