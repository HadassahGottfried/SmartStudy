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

/**
 * @swagger
 * /sub_categories:
 *   get:
 *     summary: Get all sub-categories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: A list of sub-categories
 **/
    this.router.get('/', authenticateJWT, this.getAll);
    /**
 * @swagger
  * /subCategories/{id}:
 *   get:
 *     summary: Get sub-category by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A sub-category
 **/
    this.router.get('/:id',validateRequest({paramsSchema:idParamSchema}), authenticateJWT, this.getById);
    /**
 * @swagger
 * /subCategories:
 *   post:
 *     summary: Create sub-category
 *     tags: [SubCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 */
    this.router.post(
      '/',
      authenticateJWT,
      apiLimiter,
      validateRequest({ bodySchema: createUserSchema }),
      this.create
    );
    /**
 * @swagger
 /subCategories/{id}:
 *   put:
 *     summary: Update sub-category
 *     tags: [SubCategories]
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
 *               categoryId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated
 **/
    this.router.put(
      '/:id',
      validateRequest({paramsSchema:idParamSchema}),
      authenticateJWT,
      apiLimiter,
      validateRequest({ bodySchema: updateUserSchema }),
      this.update
    );
    /**
 * @swagger
 * /subCategories/{id}:
  *   delete:
 *     summary: Delete sub-category
 *     tags: [SubCategories]
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
      this.delete
    );
  }

  private getAll = async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await this.service.getAll();
    res.json(result);
  };

  private getById = async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
      return res.status(400).json({ message: 'Invalid ID' });

    const result = await this.service.getById(id);
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(result);
  };

  private create = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await this.service.create(req.body);
    res.status(201).json(result);
  };

  private update = async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    
      return res.status(400).json({ message: 'Invalid ID' });
    

    const result = await this.service.update(id, req.body);
    res.json(result);
  };

  private delete = async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
   
      return res.status(400).json({ message: 'Invalid ID' });
    

    await this.service.delete(id);
    res.status(204).send();
  };
}

export default new SubCategoryAPI().router;
