import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string().min(10),
  id_number: z.string().min(5)
});

export const registerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  id_number: z.string().min(5)
});
