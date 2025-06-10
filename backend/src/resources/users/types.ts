import { Request } from 'express';

export interface User {
  id?: string;
  name: string;
  phone: string;
  id_number: string; // מוצפן - תעודת זהות
}

export interface PublicUser {
  id: string;
  name: string;
  phone: string;
}

export interface UserPayload {
  id: string;
  name: string;
  phone: string;
}

export interface CustomRequest extends Request {
  user?: UserPayload;
}