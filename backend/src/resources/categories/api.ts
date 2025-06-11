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
    this.router.get('/', authenticateJWT, this.getAllCategories);
    this.router.get('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.getCategoryById);
    this.router.post('/', authenticateJWT, apiLimiter, validateRequest({ bodySchema: createUserSchema }), this.createCategory);
    this.router.put('/:id', authenticateJWT, apiLimiter, validateRequest({ paramsSchema: idParamSchema }), validateRequest({ bodySchema: updateUserSchema }), this.updateCategory);
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
    const category = await this.service.createCategory(req.body);
    res.status(201).json(category);
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
