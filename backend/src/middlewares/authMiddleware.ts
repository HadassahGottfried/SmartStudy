import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest, UserPayload } from '../resources/users/types';

const JWT_SECRET = process.env.JWT_SECRET!;
export function authenticateJWT(req: CustomRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'] as string | undefined;
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}
