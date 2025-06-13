import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

export const idParamSchema = z.object({
  id: z.string().uuid()
});
export const searchUserSchema = z.object({
  name: z.string().min(1),
});
