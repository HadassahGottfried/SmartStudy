import { Router, Request, Response, NextFunction } from 'express';
import { SubCategoryService } from './service';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { apiLimiter } from '../../middlewares/rateLimitMiddleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserSchema, idParamSchema, updateUserSchema } from '../users/schema';

class SubCategoryAPI {
  public router = Router();
  private service = new SubCategoryService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', authenticateJWT, this.getAll);
    this.router.get('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.getById);
    this.router.post('/', authenticateJWT, apiLimiter, validateRequest({ bodySchema: createUserSchema }), this.create);
    this.router.put('/:id', authenticateJWT, apiLimiter, validateRequest({ paramsSchema: idParamSchema }), validateRequest({ bodySchema: updateUserSchema }), this.update);
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
