import { Router, Request, Response, NextFunction } from 'express';
import { CategoryService } from './service';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { apiLimiter } from '../../middlewares/rateLimitMiddleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { createCategorySchema, updateCategorySchema,idParamSchema } from './schema';

class CategoryAPI {
  public router = Router();
  private service = new CategoryService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all categories
 */
    this.router.get('/', authenticateJWT, this.getAllCategories);
/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single category
 *       404:
 *         description: Category not found
 */
    this.router.get('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.getCategoryById);

    /**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Category created
 */
    this.router.post('/', authenticateJWT, validateRequest({ bodySchema: createCategorySchema }), this.createCategory);
  /**
 * @openapi
 * categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/UpdateCategory'
 *     responses:
 *       200:
 *         description: Category updated
 */
    this.router.put('/:id', authenticateJWT, apiLimiter, validateRequest({ paramsSchema: idParamSchema }), validateRequest({ bodySchema: updateCategorySchema }), this.updateCategory);

    /**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category deleted
 */
    this.router.delete('/:id', authenticateJWT, apiLimiter, validateRequest({ paramsSchema: idParamSchema }), this.deleteCategory);
  }

  private getAllCategories = async (_req: Request, res: Response) => {
    const categories = await this.service.getAllCategories();
    res.json(categories);
  };

  private getCategoryById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid category ID' });

    const category = await this.service.getCategoryById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  };

  private createCategory = async (req: Request, res: Response) => {
  try {
    console.log('📥 body =', req.body);

    const category = await this.service.createCategory(req.body.name);

    return res.status(201).json(category); // ✅ חשוב: return כדי לעצור את הזרימה אחרי התגובה
  } catch (error) {
    console.error('❌ Error in createCategory:', error);

    // רק אם עדיין לא נשלחה תגובה
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    // אם כבר נשלחה תגובה, פשוט לא עושים כלום (או אפשר לרשום ללוג בלבד)
  }
};



  private updateCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid category ID' });

    const updated = await this.service.updateCategory(id, req.body);
    res.json(updated);
  };

  private deleteCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid category ID' });

    await this.service.deleteCategory(id);
    res.status(204).send();
  };
}

export default new CategoryAPI().router;
