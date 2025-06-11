import { z } from 'zod';

export const createSubCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

export const updateSubCategorySchema = z.object({
  name: z.string().min(1).optional(),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
});