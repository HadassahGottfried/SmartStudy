import { Router, Request, Response, NextFunction } from 'express';
import { PromptService } from './service';
import { OpenAIService } from '../../utils/openaiService';
import { validateRequest } from '../../middlewares/validateRequest';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { CustomRequest } from '../users/types';
import { createPromptSchema, userIdParamSchema } from './schema';

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
    this.router.get('/user/:userId', authenticateJWT, validateRequest({ paramsSchema: userIdParamSchema }), this.getPromptsByUserId);

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

    this.router.post('/', authenticateJWT, validateRequest({ bodySchema: createPromptSchema }), this.create);

  }

  private getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    res.json(result);
  };
  private getMyPrompts = async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const prompts = await this.service.getByUserId(userId);
    res.json(prompts);
  };

  private getPromptsByUserId = async (req: CustomRequest, res: Response) => {
    const requester = req.user;

    if (!requester?.isAdmin) {
      return res.status(403).json({ message: 'Access denied: admin only' });
    }

    const { userId } = req.params;

    const prompts = await this.service.getByUserId(userId);
    res.json(prompts);
  };

  private create = async (req: CustomRequest, res: Response) => {
    const { prompt, category_id, sub_category_id } = req.body;
    const user_id = req.user?.id;
    if (!user_id) return res.status(403).json({ message: 'Unauthorized' });

    const categoryName = await this.service.getCategoryNameById(category_id);
    const subCategoryName = await this.service.getSubCategoryNameById(sub_category_id);

    if (!categoryName || !subCategoryName) {
      return res.status(400).json({ message: 'Invalid category or sub-category ID' });
    }

    const lesson = await this.openAIService.generateLesson(
      prompt,
      categoryName,
      subCategoryName
    );

    const savedPrompt = await this.service.create({
      user_id,
      category_id,
      sub_category_id,
      prompt,
      response: lesson,
      created_at: new Date(),
    });

    res.status(201).json(savedPrompt);
  };


}
export default new PromptAPI().router;
