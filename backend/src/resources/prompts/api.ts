import { Router, Request, Response, NextFunction } from 'express';
import { PromptService } from './service';
import { OpenAIService } from '../../utils/openaiService';
import { validateRequest } from '../../middlewares/validateRequest';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { CustomRequest } from '../users/types';
import { createPromptSchema,idParamSchema } from './schema';

class PromptAPI {
  public router = Router();
  private service = new PromptService();
  private openAIService = new OpenAIService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
   /**
 * @openapi
 * /prompts:
 *   get:
 *     summary: Get all prompts
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of prompts
 */
    this.router.get('/', authenticateJWT, this.getAll);

    /**
 * @openapi
 * /prompts/my:
 *   get:
 *     summary: Get all prompts for the authenticated user
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's prompts
 */
    this.router.get('/my', authenticateJWT, this.getMyPrompts);
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
 *       404:
 *         description: Not found
 */
    this.router.get('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.getById);

/**
 * @openapi
 * /prompts:
 *   post:
 *     summary: Create a new prompt and generate lesson using OpenAI
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePrompt'
 *     responses:
 *       201:
 *         description: Created prompt
 */

    this.router.post('/', authenticateJWT,validateRequest({ bodySchema: createPromptSchema }), this.create);
 /**
 * @openapi
 * /prompts/{id}:
 *   put:
 *     summary: Update prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Updated
 */
    this.router.put('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.update);
/**
 * @openapi
 * /prompts/{id}:
 *   delete:
 *     summary: Delete prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Deleted
 */
    this.router.delete('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.delete);
  }

  private getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    res.json(result);
  };
private getMyPrompts = async (req: CustomRequest, res: Response) => {
  console.log('📦 req.user =', req.user);

  const userId = req.user?.id;
  if (!userId) {
    console.log('❌ אין userId בטוקן!');
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const prompts = await this.service.getByUserId(userId);
  res.json(prompts);
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
