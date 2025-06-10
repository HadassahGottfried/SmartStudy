// src/users/validation.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});
export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number string'),
});
