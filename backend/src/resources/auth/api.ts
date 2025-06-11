import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserService } from '../users/service';
import { validateRequest } from '../../middlewares/validateRequest';
import { loginSchema, registerSchema } from './schema';
import { User } from '../users/types';

dotenv.config();

class AuthAPI {
  public router = Router();
  private service = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * /auth/login:
     *   post:
     *     summary: Log in a user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginUser'
     *     responses:
     *       200:
     *         description: Logged in successfully, returns JWT
     *       401:
     *         description: Invalid credentials
     */
    this.router.post('/login', validateRequest({ bodySchema: loginSchema }), this.login);

    /**
     * @openapi
     * /auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterUser'
     *     responses:
     *       201:
     *         description: Registered successfully, returns JWT
     */
    this.router.post('/register', validateRequest({ bodySchema: registerSchema }), this.register);
  }

  private login = async (req: Request, res: Response) => {
    const { phone, name } = req.body;

    const user = await this.service.getUserByPhoneAndName(phone, name);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = this.generateToken(user);
    res.json({ token });
  };

  private register = async (req: Request, res: Response) => {
    const { name, phone } = req.body;

    const newUser: User = await this.service.registerUser({ name, phone });
    const token = this.generateToken(newUser);
    res.status(201).json({ token });
  };

  private generateToken(user: User): string {
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '2h' });
  }
}

export default new AuthAPI().router;
