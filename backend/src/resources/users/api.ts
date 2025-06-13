import { Router,Request, Response, NextFunction } from 'express';
import { UserService } from './service';
import { validateRequest } from '../../middlewares/validateRequest';
import {  idParamSchema ,searchUserSchema,updateUserSchema} from './schema';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { CustomRequest } from './types';

class UserAPI {
  public router = Router();
  private service = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * /users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of users
     */
    this.router.get('/', authenticateJWT, this.getAllUsers);

    /**
     * @openapi
     * /users/{id}:
     *   get:
     *     summary: Get user by ID
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User found
     *       404:
     *         description: User not found
     */
    this.router.get('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.getUserById);

    /**
     * @openapi
     * /users/search/name:
     *   get:
     *     summary: Search users by name
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: name
     *         in: query
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of users matching name
     */
    this.router.get('/search/name', authenticateJWT,  validateRequest({ querySchema: searchUserSchema }),
 this.searchByName);

    /**
     * @openapi
     * /users/{id}:
     *   put:
     *     summary: Update existing user
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUser'
     *     responses:
     *       200:
     *         description: User updated
     */
    this.router.put('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), validateRequest({ bodySchema: updateUserSchema }), this.updateUser);

  }

  private getAllUsers = async (req: CustomRequest, res: Response, _next: NextFunction) => {
    const users = await this.service.getAllUsers();
    res.json(users);
  };

  private getUserById = async (req: CustomRequest, res: Response, _next: NextFunction) => {
    const user = await this.service.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  };

 private searchByName = async (req: CustomRequest, res: Response, _next: NextFunction) => {
  const { name } = req.query as { name: string };
  const users = await this.service.findUsersByName(name);
  res.json(users);
};

  private updateUser = async (req: CustomRequest, res: Response, _next: NextFunction) => {
    const updated = await this.service.updateUser(req.params.id, req.body);
    res.json(updated);
  };

}

export default new UserAPI().router;
