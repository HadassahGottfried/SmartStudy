import { Router, Response, NextFunction } from 'express';
import { UserService } from './service';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserSchema, idParamSchema, updateUserSchema } from './schema';
import { authenticateJWT } from '../../middlewares/authMiddleware';
import { CustomRequest } from './types';

class UserAPI {
  public router = Router();
  private service = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', authenticateJWT, this.getAllUsers);
    this.router.get('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.getUserById);
    this.router.get('/search/name', authenticateJWT, this.searchByName);
    this.router.post('/', authenticateJWT, validateRequest({ bodySchema: createUserSchema }), this.createUser);
    this.router.put('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), validateRequest({ bodySchema: updateUserSchema }), this.updateUser);
    this.router.delete('/:id', authenticateJWT, validateRequest({ paramsSchema: idParamSchema }), this.deleteUser);
  }

  private getAllUsers = async (_req: CustomRequest, res: Response, _next: NextFunction) => {
    const users = await this.service.getAllUsers();
    res.json(users);
  };

  private getUserById = async (req: CustomRequest, res: Response, _next: NextFunction) => {
    const user = await this.service.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  };

  private searchByName = async (req: CustomRequest, res: Response, _next: NextFunction) => {
    const { name } = req.query;
    if (!name || typeof name !== 'string') return res.status(400).json({ message: 'Invalid name' });

    const users = await this.service.findUsersByName(name);
    res.json(users);
  };

  private createUser = async (req: CustomRequest, res: Response, _next: NextFunction) => {
    const newUser = await this.service.createUser(req.body);
    res.status(201).json(newUser);
  };

  private updateUser = async (req: CustomRequest, res: Response, _next: NextFunction) => {
    const updated = await this.service.updateUser(req.params.id, req.body);
    res.json(updated);
  };

  private deleteUser = async (req: CustomRequest, res: Response, _next: NextFunction) => {
    await this.service.deleteUser(req.params.id);
    res.status(204).send();
  };
}

export default new UserAPI().router;
