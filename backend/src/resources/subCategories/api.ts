import { Router, Request, Response, NextFunction } from 'express';
import { SubCategoryService } from './service';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { apiLimiter } from '../../middlewares/rateLimitMiddleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { createSubCategorySchema, updateSubCategorySchema ,idParamSchema} from './schema';

class SubCategoryAPI {
  public router = Router();
  private service = new SubCategoryService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
 /**
 * @openapi
 * /sub_categories:
 *   get:
 *     summary: Get all sub-categories
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sub-categories
 */
    this.router.get('/', authenticateJWT, this.getAll);
    /**
 /**
 * @openapi
 * /sub_categories/{id}:
 *   get:
 *     summary: Get sub-category by ID
 *     tags: [SubCategories]
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
 *         description: A sub-category
 *       404:
 *         description: Not found
 */
   this.router.get('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.getById);
    /**
 * @openapi
 * /sub_categories:
 *   post:
 *     summary: Create sub-category
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           $ref: '#/components/schemas/CreateSubCategory'
 *     responses:
 *       201:
 *         description: Created
 */
    this.router.post('/', authenticateJWT, apiLimiter, validateRequest({ bodySchema: createSubCategorySchema }), this.create);
   /**
 * @openapi
 * /sub_categories/{id}:
 *   put:
 *     summary: Update sub-category
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/UpdateSubCategory'
 *     responses:
 *       200:
 *         description: Updated
 */
    this.router.put('/:id', authenticateJWT, apiLimiter, validateRequest({ paramsSchema: idParamSchema }), validateRequest({ bodySchema: updateSubCategorySchema }), this.update);
    /**
 * @openapi
 * /sub_categories/{id}:
 *   delete:
 *     summary: Delete sub-category
 *     tags: [SubCategories]
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
    this.router.delete('/:id', authenticateJWT, apiLimiter, validateRequest({ paramsSchema: idParamSchema }), this.delete);
  }

  private getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    res.json(result);
  };

  private getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    const result = await this.service.getById(id);
    if (!result) return res.status(404).json({ message: 'Not found' });

    res.json(result);
  };

  private create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    res.status(201).json(result);
  };

  private update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    const result = await this.service.update(id, req.body);
    res.json(result);
  };

  private delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    await this.service.delete(id);
    res.status(204).send();
  };
}

export default new SubCategoryAPI().router;
