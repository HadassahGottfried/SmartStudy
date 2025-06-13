import { z } from 'zod';

export const createPromptSchema = z.object({
  prompt: z.string().min(5, 'Prompt is required'),
  category_id: z.number(),
  sub_category_id: z.number(),
});

export const userIdParamSchema = z.object({
  userId: z.string().uuid({ message: 'Invalid user ID format' }),
});
