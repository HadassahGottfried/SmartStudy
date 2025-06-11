import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  name: z.string().min(2, 'Name must be at least 2 characters')
});

export const registerSchema = z.object({
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  name: z.string().min(2, 'Name must be at least 2 characters')
});
