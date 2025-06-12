/*
  Warnings:

  - You are about to drop the column `categoryId` on the `SubCategory` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
