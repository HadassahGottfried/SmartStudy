import { Router, Request, Response, NextFunction } from 'express';
import { CategoryService } from './service';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { apiLimiter } from '../../middlewares/rateLimitMiddleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserSchema, idParamSchema, updateUserSchema } from '../users/schema';

class CategoryAPI {
  public router = Router();
  private service = new CategoryService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
     /**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 **/
    this.router.get('/', authenticateJWT, this.getAllCategories);
     /**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A category
 **/
    this.router.get('/:id',validateRequest({paramsSchema:idParamSchema}), authenticateJWT, this.getCategoryById);
     /**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created category
 */
    this.router.post(
      '/',
      authenticateJWT,
      apiLimiter,
      validateRequest({ bodySchema: createUserSchema }),
      this.createCategory
    );
     /**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
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
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated category
 **/
    this.router.put(
      '/:id',
      validateRequest({paramsSchema:idParamSchema}),
      authenticateJWT,
      apiLimiter,
      validateRequest({ bodySchema: updateUserSchema }),
      this.updateCategory
    );
     /**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
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
    this.router.delete(
      '/:id',
      validateRequest({paramsSchema:idParamSchema}),
      authenticateJWT,
      apiLimiter,
      this.deleteCategory
    );
  }

  private getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await this.service.getAllCategories();
    res.json(categories);
  };

  private getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
   
      return res.status(400).json({ message: 'Invalid category ID' });
  

    const category = await this.service.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  };

  private createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const category = await this.service.createCategory(req.body);
    res.status(201).json(category);
  };

  private updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
  
      return res.status(400).json({ message: 'Invalid category ID' });
  

    const updatedCategory = await this.service.updateCategory(id, req.body);
    res.json(updatedCategory);
  };

  private deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
 
      return res.status(400).json({ message: 'Invalid category ID' });
  

    await this.service.deleteCategory(id);
    res.status(204).send();
  };
}

export default new CategoryAPI().router;
