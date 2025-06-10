import db from '../../utils/db-conn';
import { Prompt } from './types';

export class PromptDAL {
  async getAllPrompts(): Promise<Prompt[]> {
    return db.prisma.prompt.findMany();
  }

  async getPromptById(id: number): Promise<Prompt | null> {
    return db.prisma.prompt.findUnique({ where: { id } });
  }

  async createPrompt(data: Prompt): Promise<Prompt> {
    return db.prisma.prompt.create({ data });
  }

  async updatePrompt(id: number, data: Partial<Prompt>): Promise<Prompt> {
    return db.prisma.prompt.update({ where: { id }, data });
  }

  async deletePrompt(id: number): Promise<Prompt> {
    return db.prisma.prompt.delete({ where: { id } });
  }
}
