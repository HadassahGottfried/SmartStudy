import db from '../../utils/db-conn';
import { Prompt } from './types';
import { PromptDAL } from './dal';

export class PromptService {
  private dal = new PromptDAL();

  async getAll(): Promise<Prompt[]> {
    return this.dal.getAllPrompts();
  }

  async getByUserId(user_id: string): Promise<Prompt[]> {
    return this.dal.getPromptsByUserId(user_id);
  }

  async getById(id: number): Promise<Prompt | null> {
    return this.dal.getPromptById(id);
  }

  async create(data: Prompt): Promise<Prompt> {
    return this.dal.createPrompt(data);
  }

  

  async delete(id: number): Promise<Prompt> {
    return this.dal.deletePrompt(id);
  }

  // ✅ פונקציה לשליפת שם קטגוריה לפי ID
  async getCategoryNameById(id: number): Promise<string | null> {
    const category = await db.prisma.category.findUnique({ where: { id } });
    return category?.name || null;
  }

  // ✅ פונקציה לשליפת שם תת־קטגוריה לפי ID
  async getSubCategoryNameById(id: number): Promise<string | null> {
    const subCategory = await db.prisma.subCategory.findUnique({ where: { id } });
    return subCategory?.name || null;
  }
}
