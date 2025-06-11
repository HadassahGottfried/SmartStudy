import { Router, Request, Response, NextFunction } from 'express';
import { PromptService } from './service';
import { OpenAIService } from '../../utils/openaiService';
import { idParamSchema } from '../users/schema';
import { validateRequest } from '../../middlewares/validateRequest';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { CustomRequest } from '../users/types';

class PromptAPI {
  public router = Router();
  private service = new PromptService();
  private openAIService = new OpenAIService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', authenticateJWT, this.getAll);
    this.router.get('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.getById);
    this.router.post('/', authenticateJWT, this.create);
    this.router.put('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.update);
    this.router.delete('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.delete);
  }

  private getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    res.json(result);
  };

  private getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await this.service.getById(id);
    if (!result) return res.status(404).json({ message: 'Prompt not found' });
    res.json(result);
  };

  private create = async (req: CustomRequest, res: Response) => {
    const { prompt, category_id, sub_category_id } = req.body;
    const user_id = req.user?.id;
    if (!user_id) return res.status(403).json({ message: 'Unauthorized' });

    const lesson = await this.openAIService.generateLesson(prompt);
    const savedPrompt = await this.service.create({
      user_id,
      category_id,
      sub_category_id,
      prompt,
      response: lesson,
      created_at: new Date()
    });
    res.status(201).json(savedPrompt);
  };

  private update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await this.service.update(id, req.body);
    res.json(result);
  };

  private delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.service.delete(id);
    res.status(204).send();
  };
}

export default new PromptAPI().router;
