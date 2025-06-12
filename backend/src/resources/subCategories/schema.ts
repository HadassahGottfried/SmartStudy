import { z } from 'zod';

export const createSubCategorySchema = z.object({
  name: z.string().min(1, 'Sub-category name is required'),
  category_id: z.number({
    required_error: 'Category ID is required',
    invalid_type_error: 'Category ID must be a number',
  }),
});


export const updateSubCategorySchema = z.object({
  name: z.string().min(1).optional(),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
});