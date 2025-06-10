import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  id_number: z.string().min(5)
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  id_number: z.string().optional()
});

export const idParamSchema = z.object({
  id: z.string().uuid()
});
