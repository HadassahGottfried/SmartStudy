import db from '../../utils/db-conn';
import { Prisma } from '@prisma/client';
import { SubCategory } from './types';

import { SubCategory as PrismaSubCategory } from '@prisma/client';

export class SubCategoryDAL {
  async getAllSubCategories(): Promise<PrismaSubCategory[]> {
    return db.prisma.subCategory.findMany();
  }

  async getSubCategoryById(id: number): Promise<PrismaSubCategory | null> {
    return db.prisma.subCategory.findUnique({ where: { id } });
  }

  async createSubCategory(data: Prisma.SubCategoryUncheckedCreateInput): Promise<PrismaSubCategory> {
    return db.prisma.subCategory.create({ data });
  }

  async updateSubCategory(id: number, data: Partial<PrismaSubCategory>): Promise<PrismaSubCategory> {
    return db.prisma.subCategory.update({ where: { id }, data });
  }

  async deleteSubCategory(id: number): Promise<PrismaSubCategory> {
    return db.prisma.subCategory.delete({ where: { id } });
  }
}
