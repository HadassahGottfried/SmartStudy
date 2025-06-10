import { Router, Request, Response, NextFunction } from 'express';
import { PromptService } from './service';
import { OpenAIService } from '../../utils/openaiService';  // ודא שהנתיב נכון
import { idParamSchema } from '../users/schema';
import { validateRequest } from '../../middlewares/validateRequest';
import { CustomRequest } from '../users/types';

class PromptAPI {
  public router = Router();
  private service = new PromptService();
  private openAIService = new OpenAIService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
 * @swagger
 * /prompts:
 *   get:
 *     summary: Get all prompts
 *     tags: [Prompts]
 *     responses:
 *       200:
 *         description: A list of prompts
 **/
    this.router.get('/', this.getAll);
    /**
 * @swagger
  * /prompts/{id}:
 *   get:
 *     summary: Get prompt by ID
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A prompt
 **/
    this.router.get('/:id',validateRequest({paramsSchema:idParamSchema}), this.getById);
    /**
 * @swagger
 * /prompts:
 *   post:
 *     summary: Create a new prompt and generate lesson using OpenAI
 *     tags: [Prompts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               user_id:
 *                 type: string
 *               category_id:
 *                 type: number
 *               sub_category_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created prompt
 */
    this.router.post('/', this.create);
    /**
 * @swagger
 * /prompts/{id}:
 *   put:
 *     summary: Update prompt
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 **/
    this.router.put('/:id',validateRequest({paramsSchema:idParamSchema}), this.update);
    /**
 * @swagger
 * /prompts/{id}:
 *   delete:
 *     summary: Delete prompt
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Deleted
 **/
    this.router.delete('/:id',validateRequest({paramsSchema:idParamSchema}), this.delete);
  }

  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.service.getAll();
    res.json(result);
  };

  private getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const result = await this.service.getById(id);
    if (!result) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    res.json(result);
  };

  private create = async (req: CustomRequest, res: Response, next: NextFunction) => {
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

  private update = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const result = await this.service.update(id, req.body);
    res.json(result);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    await this.service.delete(id);
    res.status(204).send();
  };
}

export default new PromptAPI().router;
