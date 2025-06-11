import { z } from 'zod';



export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  id_number: z.string().optional()
});

export const idParamSchema = z.object({
  id: z.string().uuid()
});
