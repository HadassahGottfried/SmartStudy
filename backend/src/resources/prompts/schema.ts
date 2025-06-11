import { z } from 'zod';

export const createPromptSchema = z.object({
  prompt: z.string().min(5, 'Prompt is required'),
  category_id: z.number(),
  sub_category_id: z.number(),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
});