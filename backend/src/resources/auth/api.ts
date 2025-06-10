// src/resources/auth/api.ts
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
    this.router.post('/login', validateRequest({ bodySchema: loginSchema }), this.login);
    this.router.post('/register', validateRequest({ bodySchema: registerSchema }), this.register);
  }

  private login = async (req: Request, res: Response) => {
    const { phone, id_number } = req.body;

    const user = await this.service.getUserByPhone(phone);
    if (!user || !(await bcrypt.compare(id_number, user.id_number))) {
      return res.status(401).json({ message: 'Invalid phone or ID number' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '2h' });

    res.json({ token });
  };

  private register = async (req: Request, res: Response) => {
    const { name, phone, id_number } = req.body;
    const hashedId = await bcrypt.hash(id_number, 10);

    const newUser: User = await this.service.createUser({
      name,
      phone,
      id_number: hashedId
    });

    const payload = {
      id: newUser.id,
      name: newUser.name,
      phone: newUser.phone
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '2h' });

    res.status(201).json({ token });
  };
}

export default new AuthAPI().router;
