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

  async update(id: number, data: Partial<Prompt>): Promise<Prompt> {
    return this.dal.updatePrompt(id, data);
  }

  async delete(id: number): Promise<Prompt> {
    return this.dal.deletePrompt(id);
  }
}
