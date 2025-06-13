import db from '../../utils/db-conn';
import { Prompt } from '@prisma/client';

type CreatePromptInput = {
  user_id: string;
  prompt: string;
  response: string;
  created_at: Date;
  category_id: number;
  sub_category_id: number;
};

type UpdatePromptInput = Omit<Partial<Prompt>, 'id'>;

export class PromptDAL {
  async getAllPrompts(): Promise<Prompt[]> {
    return db.prisma.prompt.findMany();
  }

  async getPromptById(id: number): Promise<Prompt | null> {
    return db.prisma.prompt.findUnique({
      where: { id },
      include: {
        category: true,
        sub_category: true,
      },
    });
  }

  async getPromptsByUserId(user_id: string): Promise<Prompt[]> {
    return db.prisma.prompt.findMany({
      where: { user_id },
      include: {
        category: true,
        sub_category: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async createPrompt(data: CreatePromptInput): Promise<Prompt> {
    return db.prisma.prompt.create({
      data,
      include: {
        category: true,
        sub_category: true,
      },
    });
  }

  async updatePrompt(id: number, data: UpdatePromptInput): Promise<Prompt> {
    return db.prisma.prompt.update({
      where: { id },
      data,
      include: {
        category: true,
        sub_category: true,
      },
    });
  }

  async deletePrompt(id: number): Promise<Prompt> {
    return db.prisma.prompt.delete({
      where: { id },
    });
  }
}
