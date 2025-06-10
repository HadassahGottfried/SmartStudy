import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from './service';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserSchema, idParamSchema, updateUserSchema } from './schema';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { apiLimiter } from '../../middlewares/rateLimitMiddleware';

class UserAPI {
  public router = Router();
  private service = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 * */
    this.router.get('/', authenticateJWT, this.getAllUsers);
    /**
 * @swagger
    * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user
 **/
    this.router.get('/:id', validateRequest({paramsSchema:idParamSchema}),authenticateJWT, this.getUserById);
 /**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created user
 * */
    this.router.post(
      '/',
      authenticateJWT,
      apiLimiter,
      validateRequest({ bodySchema: createUserSchema }),
      this.createUser
    );
 /**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated user
 **/
    this.router.put(
      '/:id',
      authenticateJWT,
      apiLimiter,
      validateRequest({paramsSchema:idParamSchema}),
      validateRequest({ bodySchema: updateUserSchema }),
      this.updateUser
    );
 /**
 * @swagger
 * /users:
 *  *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 **/
    this.router.delete(
      '/:id',
      validateRequest({paramsSchema:idParamSchema}),
      authenticateJWT,
      apiLimiter,
      this.deleteUser
    );
  }

  private getAllUsers = async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await this.service.getAllUsers();
    res.json(users);
  };

  private getUserById = async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
  
      return res.status(400).json({ message: 'Invalid user ID' });
   

    const user = await this.service.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  };

  private createUser = async (req: Request, res: Response, _next: NextFunction) => {
    const newUser = await this.service.createUser(req.body);
    res.status(201).json(newUser);
  };

  private updateUser = async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
 
      return res.status(400).json({ message: 'Invalid user ID' });
  

    const updatedUser = await this.service.updateUser(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  };

  private deleteUser = async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
 
      return res.status(400).json({ message: 'Invalid user ID' });
   

    const deleted = await this.service.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send();
  };
}

export default new UserAPI().router;
